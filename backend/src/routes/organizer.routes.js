import { Router } from 'express';
import { getOrganizerDashboard } from '../controllers/organizer.controller.js';

const router = Router();

router.get('/dashboard', getOrganizerDashboard);

export default router;
