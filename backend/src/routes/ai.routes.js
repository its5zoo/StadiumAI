import { Router } from 'express';
import { navigation, translate, crowdAnalysis, recommendations, voiceQuery } from '../controllers/ai.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

router.post('/navigation', authenticate, navigation);
router.post('/translate', authenticate, translate);
router.post('/crowd-analysis', authenticate, authorizeRole(ROLES.ORGANIZER, ROLES.ADMIN), crowdAnalysis);
router.post('/recommendations', authenticate, authorizeRole(ROLES.ORGANIZER, ROLES.ADMIN), recommendations);
router.post('/voice/query', authenticate, voiceQuery);

export default router;
