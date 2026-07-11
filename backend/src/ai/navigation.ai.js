import { getGeminiModel } from '../config/gemini.js';
import { isPromptInjection, withPromptGuard } from './promptGuard.ai.js';
import { navigationResponses } from '../mock/navigationResponses.js';

export const processNavigationQuery = async (query, stadiumContext, ragContext) => {
  if (isPromptInjection(query)) {
    return "Security Alert: Prompt injection detected. Request blocked.";
  }

  try {
    const model = getGeminiModel();
    const systemInstruction = withPromptGuard(`
      You are an intelligent FIFA stadium assistant for ${stadiumContext.name}.
      You help fans navigate the stadium safely using Retrieval Augmented Generation (RAG).
      
      RAG CONTEXT (Stadium Knowledge Base):
      ${ragContext}
      
      LIVE STADIUM DATA:
      Zones: ${JSON.stringify(stadiumContext.zones)}
      
      RULES:
      1. You must ONLY answer using the provided RAG CONTEXT and LIVE STADIUM DATA.
      2. Do not hallucinate. If the answer is not in the context, say exactly: "I don't currently have that information."
      3. Keep your answer brief and friendly (max 2 sentences).
    `);
    
    const prompt = `${systemInstruction}\n\nUser Question: "${query}"`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini AI failed, using fallback:", error.message);
    
    // Fallback logic
    const lowerPrompt = query.toLowerCase();
    for (const [key, response] of Object.entries(navigationResponses)) {
      if (lowerPrompt.includes(key)) {
        return response + " (Offline Mode)";
      }
    }
    return "I'm having trouble connecting to the network. Please ask a nearby volunteer.";
  }
};
