import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middleware/error.middleware.js';
import healthRoutes from './routes/health.routes.js';
import fanRoutes from './routes/fan.routes.js';
import organizerRoutes from './routes/organizer.routes.js';
import navigationRoutes from './routes/navigation.routes.js';
import translationRoutes from './routes/translation.routes.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/health`, healthRoutes);
app.use(`${API_PREFIX}/fan`, fanRoutes);
app.use(`${API_PREFIX}/organizer`, organizerRoutes);
app.use(`${API_PREFIX}/navigation`, navigationRoutes);
app.use(`${API_PREFIX}/translate`, translationRoutes);

// Catch 404
app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use(errorHandler);

export default app;
