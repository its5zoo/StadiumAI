import { getGeminiModel } from '../config/gemini.js';

export const processNavigationQuery = async (query, stadiumContext, ragContext) => {
  const model = getGeminiModel();
  
  const prompt = `
    You are an intelligent FIFA stadium assistant for ${stadiumContext.name}.
    You help fans navigate the stadium safely using Retrieval Augmented Generation (RAG).
    
    RAG CONTEXT (Stadium Knowledge Base):
    ${ragContext}
    
    LIVE STADIUM DATA:
    Zones: ${JSON.stringify(stadiumContext.zones)}
    
    User Question: "${query}"
    
    RULES:
    1. You must ONLY answer using the provided RAG CONTEXT and LIVE STADIUM DATA.
    2. Do not hallucinate. If the answer is not in the context, say exactly: "I don't currently have that information."
    3. Keep your answer brief and friendly (max 2 sentences).
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
