import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';
import { ROLES } from '../constants/roles.js';

const router = Router();

// Future-proof: Placeholder for Organizer knowledge uploads
router.post('/upload', authenticate, authorizeRole(ROLES.ORGANIZER, ROLES.ADMIN), (req, res) => {
  // TODO Phase 8+: 
  // 1. Accept multipart/form-data (PDFs, JSON)
  // 2. Validate file size and MIME type
  // 3. Sanitize inputs
  // 4. Extract text -> chunk -> embed -> save to VectorDB
  
  res.status(501).json({
    success: false,
    message: "Knowledge upload API is scaffolded but not yet implemented."
  });
});

export default router;
