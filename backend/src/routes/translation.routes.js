import { Router } from 'express';
import { translateText } from '../controllers/translation.controller.js';

const router = Router();

router.post('/', translateText);

export default router;
