import embeddingService from './embedding.service.js';
import chunkService from './chunk.service.js';

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

class RetrieverService {
  async retrieve(query, topK = 2) {
    try {
      const queryVector = await embeddingService.generateEmbedding(query);
      const chunks = chunkService.getChunks();
      
      if (chunks.length === 0) return [];

      const scoredChunks = chunks.map(chunk => ({
        ...chunk,
        score: cosineSimilarity(queryVector, chunk.vector)
      }));

      // Sort by score descending and take topK
      scoredChunks.sort((a, b) => b.score - a.score);
      return scoredChunks.slice(0, topK);
    } catch (error) {
      console.error("Retrieval failed:", error);
      return [];
    }
  }
}

export default new RetrieverService();
