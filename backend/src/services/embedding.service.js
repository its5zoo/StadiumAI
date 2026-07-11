import { getGeminiModel } from '../config/gemini.js';

class EmbeddingService {
  async generateEmbedding(text) {
    try {
      const model = getGeminiModel('gemini-embedding-2');
      const result = await model.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error("Embedding generation failed:", error);
      throw error;
    }
  }
}

export default new EmbeddingService();
