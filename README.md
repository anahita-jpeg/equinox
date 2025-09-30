#  Equinox

**AI-Powered Stock Market Intelligence Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.19.0-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![LangChain](https://img.shields.io/badge/LangChain-0.3.56-orange)](https://langchain.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-blue)](https://ai.google.dev/)

> Your ultimate platform for AI-powered stock analysis, portfolio management, and cutting-edge financial tools.

## 🎯 About the Project

**Equinox** is a modern, AI-powered stock market intelligence platform that combines real-time financial data with advanced artificial intelligence to provide comprehensive market analysis, personalized portfolio insights, and intelligent investment recommendations.

### Why Equinox?

- **🤖 AI-First Approach**: Powered by Google Gemini 2.0 Flash and LangGraph for intelligent market analysis
- **📊 Real-Time Data**: Integrated with Finnhub API for live stock prices and market data
- **📈 Professional Charts**: TradingView widgets for advanced technical analysis
- **🎯 Personalized Experience**: User-specific watchlists and AI-powered recommendations
- **📧 Smart Notifications**: Automated daily news summaries and market insights
- **🔒 Secure & Scalable**: Built with modern authentication and cloud-ready architecture

### Impact

Equinox democratizes access to professional-grade financial analysis tools, making sophisticated market intelligence available to both novice and experienced investors through an intuitive, AI-powered interface.

## ✨ Features

### 🏠 Dashboard
- **Market Overview**: Real-time market data with TradingView widgets
- **Stock Heatmap**: Visual representation of market performance
- **Top Stories**: Latest financial news and market updates
- **Market Quotes**: Live stock prices and performance metrics

### 🤖 AI Stock Consultant
- **Intelligent Analysis**: AI-powered stock analysis using Google Gemini
- **Portfolio Insights**: Personalized recommendations based on your watchlist
- **Market Research**: Web scraping integration for comprehensive analysis
- **Risk Assessment**: Investment risk evaluation and potential returns
- **Real-time Chat**: Interactive AI assistant for market questions

### 📊 Stock Management
- **Watchlist**: Add and track your favorite stocks
- **Stock Search**: Find stocks by symbol or company name
- **Detailed Profiles**: Comprehensive company information and financials
- **Price Alerts**: Customizable price notifications

### 🔐 User Management
- **Secure Authentication**: Better-auth integration with MongoDB
- **User Profiles**: Investment goals, risk tolerance, and preferences
- **Email Notifications**: Daily market summaries and updates

### 📧 Automated Communications
- **Welcome Emails**: Personalized onboarding experience
- **Daily News**: AI-summarized market news delivered to your inbox
- **Inngest Integration**: Reliable background job processing

## 🛠 Tech Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **Better Auth** - Modern authentication system
- **MongoDB 6.19.0** - NoSQL database with Mongoose ODM
- **Finnhub API** - Real-time stock market data
- **TradingView Widgets** - Professional charting components

### AI & Automation
- **Google Gemini 2.0 Flash** - Advanced AI language model
- **LangChain 0.3.56** - AI application framework
- **LangGraph 0.4.9** - Multi-agent AI workflows
- **Inngest 3.40.1** - Background job processing
- **Firecrawl** - Web scraping and data extraction

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Nodemailer** - Email delivery
- **Dotenv** - Environment variable management

## 🏗 Architecture

```mermaid
graph TB
    A[User Interface] --> B[Next.js Frontend]
    B --> C[API Routes]
    C --> D[Better Auth]
    C --> E[AI Agent]
    C --> F[Database Layer]
    
    E --> G[Google Gemini]
    E --> H[LangGraph]
    E --> I[Custom Tools]
    
    I --> J[Finnhub API]
    I --> K[Firecrawl]
    I --> L[MongoDB]
    
    F --> L
    D --> L
    
    M[Inngest] --> N[Background Jobs]
    N --> O[Email Service]
    N --> P[News Processing]
    
    Q[TradingView] --> B
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
    style L fill:#bfb,stroke:#333,stroke-width:2px
```

### Key Components

1. **Frontend Layer**: React-based UI with responsive design
2. **API Layer**: Next.js API routes handling authentication and data
3. **AI Layer**: LangGraph-powered agent with specialized tools
4. **Data Layer**: MongoDB with Mongoose for data persistence
5. **External Services**: Finnhub, TradingView, and web scraping APIs
6. **Background Processing**: Inngest for email automation and news processing

## 🚀 Installation Guide

### Prerequisites

- **Node.js** 18.0 or later
- **MongoDB** database (local or cloud)
- **API Keys** for external services

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/equinox.git
cd equinox
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/equinox
# or MongoDB Atlas connection string

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Stock Market Data
FINNHUB_API_KEY=your-finnhub-api-key
NEXT_PUBLIC_FINNHUB_API_KEY=your-finnhub-api-key

# AI Services
GOOGLE_API_KEY=your-google-gemini-api-key

# Web Scraping
FIRECRAWL_API_KEY=your-firecrawl-api-key

# Email Service
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
FROM_EMAIL=noreply@yourapp.com

# Background Jobs
INNGEST_SIGNING_KEY=your-inngest-signing-key
INNGEST_EVENT_KEY=your-inngest-event-key
```

### Step 4: API Keys Setup

#### Finnhub API Key
1. Visit [Finnhub.io](https://finnhub.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your environment variables

#### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables

#### Firecrawl API Key
1. Sign up at [Firecrawl.dev](https://firecrawl.dev)
2. Get your API key from the dashboard
3. Add it to your environment variables

### Step 5: Database Setup

Ensure MongoDB is running and accessible at your configured URI.

### Step 6: Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Database testing
npm run test:db
```

The application will be available at `http://localhost:3000`

## 💡 Usage Examples

### Stock Analysis with AI

```typescript
// Ask the AI assistant about a stock
"What's the latest analysis on Apple (AAPL)?"

// The AI will:
// 1. Fetch real-time AAPL data
// 2. Get company profile information
// 3. Retrieve recent news
// 4. Provide comprehensive analysis
```

### Portfolio Management

```typescript
// Add stocks to watchlist
const addToWatchlist = async (symbol: string, company: string) => {
  // Automatically saves to user's MongoDB watchlist
  // Triggers AI analysis for portfolio optimization
};

// Get personalized insights
"Analyze my current watchlist and suggest improvements"
```

### Market Research

```typescript
// Real-time market data
const marketData = await getMarketOverview();
// Returns: Live prices, market trends, sector performance

// News integration
const news = await getMarketNews(['AAPL', 'GOOGL', 'MSFT']);
// Returns: Personalized news based on your interests
```

### API Usage

```typescript
// Stock quote endpoint
GET /api/stocks/AAPL/quote
// Returns: Current price, change, volume, etc.

// Watchlist management
POST /api/watchlist
{
  "symbol": "AAPL",
  "company": "Apple Inc."
}

// AI chat endpoint
POST /api/chat
{
  "message": "What's the outlook for tech stocks?",
  "conversationHistory": [...]
}
```

## 📚 API Reference

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-up` | POST | User registration |
| `/api/auth/sign-in` | POST | User authentication |
| `/api/auth/sign-out` | POST | User logout |

### Stock Data Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stocks/[symbol]/profile` | GET | Company profile data |
| `/api/stocks/[symbol]/quote` | GET | Real-time stock quote |
| `/api/stocks/search` | GET | Search stocks by symbol/name |

### Watchlist Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/watchlist` | GET | Get user's watchlist |
| `/api/watchlist` | POST | Add stock to watchlist |
| `/api/watchlist/[symbol]` | DELETE | Remove stock from watchlist |

### AI Chat Endpoint

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | AI assistant conversation |

**Request Body:**
```json
{
  "message": "What's the latest on Tesla?",
  "conversationHistory": [
    {
      "type": "human",
      "content": "Previous message"
    }
  ],
  "stream": false
}
```

**Response:**
```json
{
  "response": "Tesla's current analysis...",
  "toolCalls": [
    {
      "name": "get_stock_quote",
      "args": { "symbol": "TSLA" }
    }
  ],
  "success": true
}
```

## 📁 Project Structure

```
equinox/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/                   # Root layout
│   ├── api/                      # API routes
│   │   ├── chat/                 # AI chat endpoint
│   │   └── inngest/              # Background job webhooks
│   ├── dashboard/                # Main dashboard
│   │   ├── stocks/[symbol]/      # Individual stock pages
│   │   └── watchlist/            # User watchlist
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── forms/                    # Form components
│   ├── ChatInterface.tsx         # AI chat interface
│   ├── Header.tsx                # Navigation header
│   ├── TradingViewWidget.tsx     # Chart widgets
│   └── WatchlistButton.tsx       # Watchlist management
├── database/                     # Database configuration
│   ├── models/                   # Mongoose models
│   └── mongoose.ts               # Database connection
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── actions/                  # Server actions
│   ├── agent/                    # AI agent configuration
│   ├── better-auth/              # Authentication setup
│   ├── inngest/                  # Background job functions
│   ├── nodemailer/               # Email service
│   └── utils.ts                  # Utility functions
├── middleware/                   # Next.js middleware
├── public/                       # Static assets
├── scripts/                      # Database scripts
├── types/                        # TypeScript type definitions
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

### Key Directories

- **`app/`**: Next.js 13+ App Router with file-based routing
- **`components/`**: Reusable React components with shadcn/ui
- **`lib/`**: Business logic, utilities, and external service integrations
- **`database/`**: MongoDB models and connection management
- **`hooks/`**: Custom React hooks for state management
- **`public/`**: Static assets and images

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Add all required environment variables in the Vercel dashboard

3. **Database Setup**
   Use MongoDB Atlas for production database

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t equinox .
docker run -p 3000:3000 equinox
```

### Environment-Specific Configuration

**Production Environment Variables:**
```env
NODE_ENV=production
BETTER_AUTH_URL=https://yourapp.vercel.app
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/equinox
```

## 🤝 Contributing Guidelines

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests: `npm run lint`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow Next.js and TypeScript best practices
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Use semantic commit messages

### Pull Request Process

1. Ensure your code follows the project's coding standards
2. Add tests for new features
3. Update documentation as needed
4. Ensure all checks pass
5. Request review from maintainers

### Areas for Contribution

- 🐛 Bug fixes and performance improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🧪 Test coverage expansion
- 🎨 UI/UX improvements
- 🔧 Developer experience enhancements

## 🗺 Roadmap

### Phase 1: Core Features ✅
- [x] User authentication and profiles
- [x] Stock data integration
- [x] Watchlist management
- [x] AI chat assistant
- [x] TradingView charts

### Phase 2: Advanced Features 🚧
- [ ] **Portfolio Tracking**: Real portfolio value tracking
- [ ] **Advanced Analytics**: Technical indicators and analysis
- [ ] **Price Alerts**: Customizable email/SMS notifications
- [ ] **Social Features**: Share insights and follow other investors
- [ ] **Mobile App**: React Native mobile application

### Phase 3: Enterprise Features 📋
- [ ] **Multi-Asset Support**: Crypto, forex, commodities
- [ ] **API Access**: Public API for third-party integrations
- [ ] **Advanced AI**: Custom model training on user data
- [ ] **White-Label Solution**: Customizable platform for institutions
- [ ] **Real-time Streaming**: WebSocket-based live data

### Phase 4: AI Enhancement 🤖
- [ ] **Voice Interface**: Voice-controlled stock analysis
- [ ] **Predictive Analytics**: ML-powered price predictions
- [ ] **Sentiment Analysis**: Social media and news sentiment
- [ ] **Automated Trading**: Integration with broker APIs
- [ ] **Risk Management**: Advanced portfolio risk assessment

## 🙏 Acknowledgements

### Open Source Libraries
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[LangChain](https://langchain.com/)** - AI application framework
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication
- **[TradingView](https://www.tradingview.com/)** - Professional charting
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Data Providers
- **[Finnhub](https://finnhub.io/)** - Real-time financial data
- **[Google Gemini](https://ai.google.dev/)** - Advanced AI capabilities
- **[Firecrawl](https://firecrawl.dev/)** - Web scraping and data extraction

### Design Inspiration
- Modern fintech applications and trading platforms
- Clean, professional UI/UX patterns
- Accessibility-first design principles

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Equinox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by the HackCrew team

</div>
