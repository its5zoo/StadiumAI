import { getGeminiModel } from '../config/gemini.js';
import { withPromptGuard } from './promptGuard.ai.js';

export const predictCrowdCongestion = async (crowdData, ragContext) => {
  try {
    const model = getGeminiModel();
    
    const prompt = withPromptGuard(`
      You are a Crowd Intelligence AI for a FIFA stadium.
      Analyze the current crowd density and status:
      
      LIVE DATA:
      ${JSON.stringify(crowdData)}
      
      RAG CONTEXT (Stadium Knowledge Base):
      ${ragContext}
      
      RULES:
      1. Identify any zone that is HIGH status or >75% density.
      2. Predict which zones might become congested next.
      3. Use the RAG CONTEXT to suggest accurate evacuation routes or alternative gates if needed.
      4. Output your analysis in a short, professional summary (max 3 sentences).
    `);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.warn("Crowd AI failed, using fallback:", error.message);
    return "Crowd analysis is currently unavailable. Please fall back to manual monitoring.";
  }
};
