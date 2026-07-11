import { Router } from 'express';
import { matchesMock } from '../mock/match.mock.js';
import { Match } from '../models/Match.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const matches = await Match.find();
    if (matches.length > 0) {
      return res.status(200).json({ success: true, data: matches });
    }
    // Fallback to mock
    res.status(200).json({ success: true, data: matchesMock });
  } catch (error) {
    console.warn("DB unavailable, falling back to mock matches");
    res.status(200).json({ success: true, data: matchesMock });
  }
});

export default router;
