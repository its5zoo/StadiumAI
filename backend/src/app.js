import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middleware/error.middleware.js';
import { authenticate } from './middleware/auth.middleware.js';
import { authorizeRole } from './middleware/role.middleware.js';
import { logActivity } from './middleware/activity.middleware.js';
import { ROLES } from './constants/roles.js';

import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import fanRoutes from './routes/fan.routes.js';
import aiRoutes from './routes/ai.routes.js';
import knowledgeRoutes from './routes/knowledge.routes.js';
import matchRoutes from './routes/match.routes.js';
import stadiumRoutes from './routes/stadium.routes.js';
import alertRoutes from './routes/alert.routes.js';
import organizerRoutes from './routes/organizer.routes.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

const API_PREFIX = '/api/v1';

// Public Routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/health`, healthRoutes);

// Shared/Unprotected domain for now, protect as needed
app.use(`${API_PREFIX}/ai`, aiRoutes);
app.use(`${API_PREFIX}/knowledge`, knowledgeRoutes);
app.use(`${API_PREFIX}/matches`, matchRoutes);
app.use(`${API_PREFIX}/stadiums`, stadiumRoutes);
app.use(`${API_PREFIX}/alerts`, alertRoutes);
app.use(`${API_PREFIX}/organizer`, organizerRoutes);

// Protected Routes with Audit Logging
app.use(`${API_PREFIX}/fan`, authenticate, authorizeRole(ROLES.FAN, ROLES.ORGANIZER), logActivity('VIEW_FAN_DASHBOARD'), fanRoutes);
app.use(`${API_PREFIX}/organizer`, authenticate, authorizeRole(ROLES.ORGANIZER, ROLES.ADMIN), logActivity('VIEW_ORGANIZER_DASHBOARD'), organizerRoutes);

app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use(errorHandler);

export default app;
