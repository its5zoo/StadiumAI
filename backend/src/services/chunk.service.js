import fs from 'fs';
import path from 'path';
import embeddingService from './embedding.service.js';

class ChunkService {
  constructor() {
    this.chunks = []; // In-memory vector DB
    this.knowledgePath = path.resolve('knowledge');
  }

  async loadAndChunkDocuments() {
    if (this.chunks.length > 0) return; // Already loaded

    console.log("Loading Stadium Knowledge Base...");
    try {
      const categories = ['stadiums', 'accessibility', 'emergency', 'operations', 'transport'];
      
      for (const category of categories) {
        const categoryPath = path.join(this.knowledgePath, category);
        if (!fs.existsSync(categoryPath)) continue;

        const files = fs.readdirSync(categoryPath);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const content = fs.readFileSync(path.join(categoryPath, file), 'utf8');
            const data = JSON.parse(content);
            
            // Create a simple chunk from the JSON representation
            const textChunk = `${category.toUpperCase()} INFO: ${JSON.stringify(data)}`;
            
            // Generate embedding for chunk
            const vector = await embeddingService.generateEmbedding(textChunk);
            
            this.chunks.push({
              id: `${category}-${file}`,
              category,
              text: textChunk,
              vector
            });
          }
        }
      }
      console.log(`Knowledge Base Loaded: ${this.chunks.length} chunks indexed.`);
    } catch (error) {
      console.error("Failed to load knowledge base:", error);
      // Don't crash, just log. RAG will fallback to empty context.
    }
  }

  getChunks() {
    return this.chunks;
  }
}

export default new ChunkService();
