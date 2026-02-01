import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";

import { getProjectByNameTool } from "../agenticTools/getProjectByNameTool.js";
import { getProjectFinancialsTool } from "../agenticTools/getProjectFinancialsTool.js";

const llm = new ChatGoogleGenerativeAI({
  model: process.env.AI_MODEL || "gemini-1.5-pro",
  temperature: 0,
  apiKey: process.env.GEMINI_API_KEY
});

// Tools
const tools = [getProjectByNameTool, getProjectFinancialsTool];

// Prompt template for the LLM
const prompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are a financial assistant. Use the tools to fetch project financials.
     Tools available: ${tools.map(t => t.name).join(", ")}`
  ),
  HumanMessagePromptTemplate.fromTemplate("{input}")
]);


export const agent = RunnableSequence.from([
  async (input) => ({ input }),
  async ({ input }) => {
    console.log("AIzaSyBjIawso-prompt",prompt)
    // Wrap raw input into ChatPromptValue
    const chatInput = await prompt.format({ input });
    return llm.invoke(chatInput);
  }
]);
