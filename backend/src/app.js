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
import organizerRoutes from './routes/organizer.routes.js';
import aiRoutes from './routes/ai.routes.js';
import knowledgeRoutes from './routes/knowledge.routes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);

const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/health`, healthRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/ai`, aiRoutes);
app.use(`${API_PREFIX}/knowledge`, knowledgeRoutes);

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
