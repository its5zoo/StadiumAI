import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import chunkService from './services/chunk.service.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await chunkService.loadAndChunkDocuments();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
