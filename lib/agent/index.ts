import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StateGraph, MessagesAnnotation, START, END } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { AIMessage, BaseMessage, SystemMessage } from '@langchain/core/messages';
import { allTools } from './tools';

// Define the state interface
interface AgentState {
  messages: BaseMessage[];
}

// Create the Gemini model with tools
const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.0-flash-exp',
  temperature: 0.1,
  apiKey: process.env.GOOGLE_API_KEY,
}).bindTools(allTools);

// System prompt for the stock market consultant agent
const SYSTEM_PROMPT = `You are an expert stock market consultant and financial advisor AI assistant. Your role is to help users make informed investment decisions by providing:

1. **Stock Analysis**: Detailed analysis of individual stocks including financial metrics, company performance, and market position
2. **Market Insights**: Current market trends, sector analysis, and economic indicators
3. **Portfolio Guidance**: Recommendations based on user's watchlist and investment goals
4. **Risk Assessment**: Evaluation of investment risks and potential returns
5. **News Analysis**: Interpretation of financial news and its market impact

**Available Tools:**
- get_user_watchlist: Access the user's watchlist and portfolio (use with the provided userId)
- get_stock_profile: Get detailed company profiles and information
- get_stock_quote: Get real-time stock prices and quotes
- get_market_news: Get latest financial news and market updates
- web_scrape: Scrape web content for additional analysis
- financial_analysis: Get analysis from trusted financial websites

**Guidelines:**
- ALWAYS use get_user_watchlist with the provided userId when asked about the user's watchlist or portfolio
- Always base recommendations on current data and thorough analysis
- Clearly explain your reasoning and cite sources
- Acknowledge risks and uncertainties in your advice
- Ask clarifying questions about user's investment goals and risk tolerance
- Use technical analysis and fundamental analysis when appropriate
- Stay updated with market conditions and breaking news

**Important:** Always remind users that your advice is for informational purposes and they should consult with a qualified financial advisor for personalized investment decisions.

Be conversational, helpful, and professional. Provide actionable insights while being transparent about limitations and risks.`;

// Define the agent node
async function callModel(state: AgentState): Promise<Partial<AgentState>> {
  const messages = state.messages;
  
  // Add system message if not present
  const hasSystemMessage = messages.some(msg => msg instanceof SystemMessage);
  const messagesToSend = hasSystemMessage 
    ? messages 
    : [new SystemMessage(SYSTEM_PROMPT), ...messages];

  const response = await model.invoke(messagesToSend);
  
  return {
    messages: [response]
  };
}

// Define the conditional edge function
function shouldContinue(state: AgentState): 'tools' | typeof END {
  const lastMessage = state.messages[state.messages.length - 1];
  
  // If the last message has tool calls, continue to tools
  if (lastMessage instanceof AIMessage && lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
    return 'tools';
  }
  
  // Otherwise, end the conversation
  return END;
}

// Create the tool node
const toolNode = new ToolNode(allTools);

// Build the graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode('agent', callModel)
  .addNode('tools', toolNode)
  .addEdge(START, 'agent')
  .addConditionalEdges('agent', shouldContinue)
  .addEdge('tools', 'agent');

// Compile the graph
export const agent = workflow.compile();

// Helper function to create a conversation
export async function createConversation(messages: BaseMessage[]) {
  const result = await agent.invoke({
    messages
  });
  
  return result.messages;
}

// Helper function to stream a conversation
export async function streamConversation(messages: BaseMessage[]) {
  const stream = await agent.stream({
    messages
  }, {
    streamMode: 'values'
  });
  
  return stream;
}