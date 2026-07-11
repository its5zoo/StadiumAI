import { processNavigationQuery } from '../ai/navigation.ai.js';
import { translateTextAI } from '../ai/translation.ai.js';
import { predictCrowdCongestion } from '../ai/crowd.ai.js';
import { generateRecommendations } from '../ai/recommendation.ai.js';
import { isPromptInjection } from '../ai/promptGuard.ai.js';
import { logAIQuery } from '../ai/aiLogger.js';

import stadiumService from '../services/stadium.service.js';
import crowdService from '../services/crowd.service.js';
import { navigationResponses } from '../mock/navigationResponses.js';

export const navigation = async (req, res, next) => {
  const start = Date.now();
  const { query } = req.body;

  if (isPromptInjection(query)) {
    return res.status(400).json({ success: false, message: "Query rejected due to security policy." });
  }

  try {
    const stadium = await stadiumService.getStadiumData();
    const aiRes = await processNavigationQuery(query, stadium);
    await logAIQuery(req.user?.id, query, aiRes, Date.now() - start);
    
    res.status(200).json({ success: true, data: { query, response: aiRes }, source: "ai" });
  } catch (error) {
    console.warn("AI Navigation Failed. Using fallback.");
    // Fallback
    const lowerQuery = query.toLowerCase();
    let fallbackRes = "Mock backend response: Please proceed to the nearest information desk.";
    for (const key in navigationResponses) {
      if (lowerQuery.includes(key)) fallbackRes = navigationResponses[key];
    }
    res.status(200).json({ success: true, data: { query, response: fallbackRes }, source: "fallback" });
  }
};

export const translate = async (req, res, next) => {
  const start = Date.now();
  const { text, sourceLang, targetLang } = req.body;

  if (isPromptInjection(text)) {
    return res.status(400).json({ success: false, message: "Query rejected due to security policy." });
  }

  try {
    const aiRes = await translateTextAI(text, targetLang);
    await logAIQuery(req.user?.id, `Translate: ${text} to ${targetLang}`, aiRes, Date.now() - start);
    
    res.status(200).json({ success: true, data: { original: text, translation: aiRes, sourceLang, targetLang }, source: "ai" });
  } catch (error) {
    console.warn("AI Translation Failed. Using fallback.");
    res.status(200).json({ success: true, data: { original: text, translation: `Mock translation for: ${text}`, sourceLang, targetLang }, source: "fallback" });
  }
};

export const crowdAnalysis = async (req, res, next) => {
  const start = Date.now();
  try {
    const crowd = await crowdService.getLiveCrowdData();
    const aiRes = await predictCrowdCongestion(crowd);
    await logAIQuery(req.user?.id, "Crowd Analysis Request", aiRes, Date.now() - start);
    
    res.status(200).json({ success: true, data: { analysis: aiRes }, source: "ai" });
  } catch (error) {
    console.warn("AI Crowd Analysis Failed. Using fallback.");
    res.status(200).json({ success: true, data: { analysis: "Mock analysis: All zones are operating normally." }, source: "fallback" });
  }
};

export const recommendations = async (req, res, next) => {
  const start = Date.now();
  try {
    const crowd = await crowdService.getLiveCrowdData();
    const alerts = await crowdService.getAlerts();
    
    const aiRes = await generateRecommendations(crowd, alerts);
    await logAIQuery(req.user?.id, "Recommendation Request", aiRes, Date.now() - start);
    
    res.status(200).json({ success: true, data: { recommendations: aiRes }, source: "ai" });
  } catch (error) {
    console.warn("AI Recommendations Failed. Using fallback.");
    res.status(200).json({ success: true, data: { recommendations: ["Mock: Monitor North Gate", "Mock: Check Food Court supplies"] }, source: "fallback" });
  }
};
