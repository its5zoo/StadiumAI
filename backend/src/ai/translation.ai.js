import { getGeminiModel } from '../config/gemini.js';

export const translateTextAI = async (text, targetLang) => {
  const model = getGeminiModel();
  
  const prompt = `
    You are a multilingual FIFA stadium assistant.
    Translate the following text into ${targetLang}.
    
    Text to translate: "${text}"
    
    RULES:
    1. Provide ONLY the translated text. Do not add explanations.
    2. Ensure stadium terminology (like "Gate", "Block", "Seat") is translated accurately.
    3. Keep the tone friendly and helpful.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};
