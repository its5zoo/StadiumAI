import { getGeminiModel } from '../config/gemini.js';

export const predictCrowdCongestion = async (crowdData) => {
  const model = getGeminiModel();
  
  const prompt = `
    You are a Crowd Intelligence AI for a FIFA stadium.
    Analyze the current crowd density and status:
    
    ${JSON.stringify(crowdData)}
    
    RULES:
    1. Identify any zone that is HIGH status or >75% density.
    2. Predict which zones might become congested next.
    3. Output your analysis in a short, professional summary (max 3 sentences).
    4. Propose immediate actions like deploying volunteers or redirecting traffic.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
