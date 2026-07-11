import { Router } from 'express';
import { stadiumsMock } from '../mock/stadium.mock.js';
import { Stadium } from '../models/Stadium.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const stadiums = await Stadium.find();
    if (stadiums.length > 0) {
      return res.status(200).json({ success: true, data: stadiums });
    }
    // Fallback
    res.status(200).json({ success: true, data: stadiumsMock });
  } catch (error) {
    res.status(200).json({ success: true, data: stadiumsMock });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const stadium = await Stadium.findOne({ id: req.params.id });
    if (stadium) {
      return res.status(200).json({ success: true, data: stadium });
    }
    const mock = stadiumsMock.find(s => s.id === req.params.id);
    if (mock) {
      return res.status(200).json({ success: true, data: mock });
    }
    res.status(404).json({ success: false, message: 'Stadium not found' });
  } catch (error) {
    const mock = stadiumsMock.find(s => s.id === req.params.id);
    if (mock) return res.status(200).json({ success: true, data: mock });
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

router.get('/:id/map', async (req, res, next) => {
  // Return dummy SVG string or redirect to asset path
  const mock = stadiumsMock.find(s => s.id === req.params.id);
  if (mock) {
    res.status(200).json({ success: true, data: { mapUrl: mock.map, zones: mock.zones } });
  } else {
    res.status(404).json({ success: false, message: 'Stadium map not found' });
  }
});

export default router;
