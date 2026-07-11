import { Router } from 'express';
import { getFanDashboard } from '../controllers/fan.controller.js';

const router = Router();

router.get('/dashboard', getFanDashboard);

export default router;
