import { getGeminiModel } from '../config/gemini.js';

export const generateRecommendations = async (crowdData, activeAlerts) => {
  const model = getGeminiModel();
  
  const prompt = `
    You are an Organizer Assistant AI.
    
    Current Crowd Data: ${JSON.stringify(crowdData)}
    Active Alerts: ${JSON.stringify(activeAlerts)}
    
    RULES:
    1. Provide 3 highly specific, actionable recommendations for the stadium organizer.
    2. Examples: "Open Gate 5", "Deploy volunteers to North Gate", "Redirect traffic to Gate 2".
    3. Return ONLY a JSON array of strings, like ["Recommendation 1", "Recommendation 2", "Recommendation 3"].
    4. Do not wrap in markdown tags like \`\`\`json.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text().trim();
  
  // Clean up any potential markdown formatting
  if (text.startsWith('```json')) text = text.replace('```json', '');
  if (text.startsWith('```')) text = text.replace('```', '');
  if (text.endsWith('```')) text = text.replace(/```$/, '');
  
  try {
    return JSON.parse(text);
  } catch (e) {
    // Fallback if AI fails to return JSON
    return [text];
  }
};
