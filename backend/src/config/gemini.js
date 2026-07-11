import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Ensure the app doesn't crash if key is missing, just fallback
let genAI = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

export const getGeminiModel = (modelName = 'gemini-3.1-flash-lite') => {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return genAI.getGenerativeModel({ model: modelName });
};
