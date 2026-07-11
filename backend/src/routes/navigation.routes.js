import { Router } from 'express';
import { queryNavigation } from '../controllers/navigation.controller.js';

const router = Router();

router.post('/query', queryNavigation);

export default router;
