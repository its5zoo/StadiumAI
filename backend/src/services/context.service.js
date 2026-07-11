import retrieverService from './retriever.service.js';

class ContextService {
  async buildContext(query) {
    const relevantChunks = await retrieverService.retrieve(query, 3);
    
    if (relevantChunks.length === 0) {
      return "No specific stadium knowledge available.";
    }

    const contextTexts = relevantChunks.map(c => c.text);
    return contextTexts.join("\n\n");
  }
}

export default new ContextService();
