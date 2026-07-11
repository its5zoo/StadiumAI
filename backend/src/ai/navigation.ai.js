import { getGeminiModel } from '../config/gemini.js';

export const processNavigationQuery = async (query, stadiumContext) => {
  const model = getGeminiModel();
  
  const prompt = `
    You are an intelligent FIFA stadium assistant for ${stadiumContext.name}.
    You help fans navigate the stadium safely.
    
    Here is the current stadium information:
    Zones: ${JSON.stringify(stadiumContext.zones)}
    
    User Question: "${query}"
    
    RULES:
    1. Only answer using the provided stadium information.
    2. Do not hallucinate or make up gates/zones that are not in the list.
    3. Keep your answer brief and friendly (max 2 sentences).
    4. If information is unavailable say exactly: "I don't currently have that information."
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
