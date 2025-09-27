import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import FirecrawlApp from '@mendable/firecrawl-js';
import { getWatchlistSymbolsByEmail } from '@/lib/actions/watchlist.actions';
import { getStockProfile, getNews, getStockQuote } from '@/lib/actions/finnhub.actions';
import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

// Tool to get user's watchlist
export const getUserWatchlistTool = tool(
  async ({ userId, email }: { userId?: string; email?: string }) => {
    try {
      if (email) {
        const symbols = await getWatchlistSymbolsByEmail(email);
        return {
          success: true,
          symbols,
          message: `Found ${symbols.length} symbols in watchlist: ${symbols.join(', ')}`
        };
      } else if (userId) {
        // Get watchlist by userId directly
        await connectToDatabase();
        const watchlistItems = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();
        
        const stocks = watchlistItems.map((item) => ({
          userId: String(item.userId),
          symbol: String(item.symbol),
          company: String(item.company || ''),
          addedAt: item.addedAt
        }));
        
        return {
          success: true,
          watchlist: stocks,
          message: `Retrieved ${stocks.length} items from user's watchlist`
        };
      } else {
        return {
          success: false,
          error: 'No user identification provided',
          message: 'Failed to retrieve watchlist - no user ID or email provided'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to retrieve watchlist'
      };
    }
  },
  {
    name: 'get_user_watchlist',
    description: 'Get the current user\'s stock watchlist. Requires userId or email to identify the user.',
    schema: z.object({
      userId: z.string().optional().describe('User ID to get watchlist for'),
      email: z.string().optional().describe('User email to get watchlist for (alternative to userId)')
    })
  }
);

// Tool to get stock profile information
export const getStockProfileTool = tool(
  async ({ symbol }: { symbol: string }) => {
    try {
      const profile = await getStockProfile(symbol.toUpperCase());
      return {
        success: true,
        profile,
        message: profile ? `Retrieved profile for ${symbol}` : `No profile found for ${symbol}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: `Failed to get profile for ${symbol}`
      };
    }
  },
  {
    name: 'get_stock_profile',
    description: 'Get detailed company profile information for a stock symbol including company name, industry, market cap, etc.',
    schema: z.object({
      symbol: z.string().describe('Stock symbol (e.g., AAPL, TSLA)')
    })
  }
);

// Tool to get stock quote/price data
export const getStockQuoteTool = tool(
  async ({ symbol }: { symbol: string }) => {
    try {
      const quote = await getStockQuote(symbol.toUpperCase());
      return {
        success: true,
        quote,
        message: quote ? `Retrieved quote for ${symbol}` : `No quote found for ${symbol}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: `Failed to get quote for ${symbol}`
      };
    }
  },
  {
    name: 'get_stock_quote',
    description: 'Get current stock price, change, and other quote data for a stock symbol',
    schema: z.object({
      symbol: z.string().describe('Stock symbol (e.g., AAPL, TSLA)')
    })
  }
);

// Tool to get market news
export const getMarketNewsTool = tool(
  async ({ symbols }: { symbols?: string[] }) => {
    try {
      const news = await getNews(symbols);
      return {
        success: true,
        news,
        message: `Retrieved ${news.length} news articles${symbols ? ` for symbols: ${symbols.join(', ')}` : ''}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to retrieve market news'
      };
    }
  },
  {
    name: 'get_market_news',
    description: 'Get latest market news. Can filter by specific stock symbols or get general market news.',
    schema: z.object({
      symbols: z.array(z.string()).optional().describe('Array of stock symbols to get news for (optional)')
    })
  }
);

// Tool to scrape web content using Firecrawl
export const webScrapeTool = tool(
  async ({ url }: { url: string }) => {
    try {
      const apiKey = process.env.FIRECRAWL_API_KEY;
      if (!apiKey) {
        throw new Error('Firecrawl API key not configured');
      }

      const app = new FirecrawlApp({ apiKey });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scrapeResult = await app.scrape(url) as any;

      if (!scrapeResult?.success) {
        throw new Error('Failed to scrape URL');
      }

      const content = scrapeResult.data?.markdown || scrapeResult.data?.html || scrapeResult.markdown || scrapeResult.html || '';

      return {
        success: true,
        content: content.slice(0, 5000), // Limit content length
        url,
        message: `Successfully scraped content from ${url}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: `Failed to scrape content from ${url}`
      };
    }
  },
  {
    name: 'web_scrape',
    description: 'Scrape web content from URLs using Firecrawl. Useful for getting financial news, analysis, and market data from external sources.',
    schema: z.object({
      url: z.string().describe('URL to scrape content from')
    })
  }
);

// Tool to search financial websites for analysis
export const financialAnalysisTool = tool(
  async ({ query, symbol }: { query: string; symbol?: string }) => {
    try {
      const apiKey = process.env.FIRECRAWL_API_KEY;
      if (!apiKey) {
        throw new Error('Firecrawl API key not configured');
      }

      // Common financial analysis websites
      const searchUrls = [
        `https://finance.yahoo.com/quote/${symbol || query}`,
        `https://www.marketwatch.com/investing/stock/${symbol || query}`,
        `https://seekingalpha.com/symbol/${symbol || query}`
      ];

      const results = [];
      
      const app = new FirecrawlApp({ apiKey });
      
      for (const url of searchUrls.slice(0, 2)) { // Limit to 2 sources to avoid rate limits
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const scrapeResult = await app.scrape(url) as any;

          if (scrapeResult?.success && (scrapeResult.data?.markdown || scrapeResult.markdown)) {
            const content = scrapeResult.data?.markdown || scrapeResult.markdown || '';
            results.push({
              url,
              content: content.slice(0, 2000), // Limit content length
              source: new URL(url).hostname
            });
          }
        } catch (error) {
          console.error(`Failed to scrape ${url}:`, error);
        }
      }

      return {
        success: true,
        results,
        query,
        symbol,
        message: `Found ${results.length} financial analysis sources for ${symbol || query}`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: `Failed to get financial analysis for ${symbol || query}`
      };
    }
  },
  {
    name: 'financial_analysis',
    description: 'Search and scrape financial analysis websites for detailed information about stocks, market trends, and investment insights.',
    schema: z.object({
      query: z.string().describe('Search query or topic for financial analysis'),
      symbol: z.string().optional().describe('Specific stock symbol to analyze')
    })
  }
);

export const allTools = [
  getUserWatchlistTool,
  getStockProfileTool, 
  getStockQuoteTool,
  getMarketNewsTool,
  webScrapeTool,
  financialAnalysisTool
];