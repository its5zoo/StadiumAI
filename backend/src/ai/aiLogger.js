import { AIQueryLog } from '../models/AIQueryLog.js';

export const logAIQuery = async (userId, question, response, latency) => {
  try {
    const log = new AIQueryLog({
      userId: userId || 'anonymous',
      question,
      response: typeof response === 'string' ? response : JSON.stringify(response),
      // Future: add latency to model if needed, but not in current schema
    });
    await log.save();
  } catch (err) {
    console.error("Failed to log AI query", err);
  }
};
