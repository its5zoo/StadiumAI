import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ROLES } from '../constants/roles.js';

let io;

export const initSocketServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // For MVP. In production, restrict to frontend domain.
      methods: ['GET', 'POST']
    }
  });

  // JWT Middleware for Socket
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: Token missing'));
    }

    try {
      if (token.startsWith('mock-jwt-')) {
        // Handle mock tokens for fallback resilience testing
        const role = token === 'mock-jwt-org' ? ROLES.ORGANIZER : ROLES.FAN;
        socket.user = { id: 'mock', role };
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const { role } = socket.user;
    
    // Join Role-Based Rooms
    if (role === ROLES.ORGANIZER || role === ROLES.ADMIN) {
      socket.join('organizers');
    } else if (role === ROLES.FAN) {
      socket.join('fans');
    }

    socket.on('disconnect', () => {
      // Handle disconnect silently
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
