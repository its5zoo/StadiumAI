import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "System healthy", data: { status: "ok" } });
});

router.get('/live', (req, res) => {
  res.status(200).json({ status: "healthy" });
});

router.get('/ready', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).json({ status: "ready" });
  } else {
    res.status(503).json({ status: "not ready" });
  }
});

export default router;
