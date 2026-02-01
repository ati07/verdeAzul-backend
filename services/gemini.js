import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";
dotenv.config();

// console.log("process.env.GEMINI_API_KEY",process.env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: process.env.AI_MODEL || "gemini-1.5-flash"
});

export async function geminiPrompt(prompt) {
  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini SDK Error →", err);
    throw new Error("Gemini request failed");
  }
}
