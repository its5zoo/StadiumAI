import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './scripts/seed.js';
import chunkService from './services/chunk.service.js';
import { initSocketServer } from './socket/socket.server.js';
import { startCrowdSimulator } from './services/simulator.service.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
    await chunkService.loadAndChunkDocuments();
    
    // Initialize WebSockets
    initSocketServer(server);
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
      
      // Start real-time background tasks
      startCrowdSimulator();
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
