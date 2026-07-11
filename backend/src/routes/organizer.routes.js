import { Router } from 'express';
import { getIO } from '../socket/socket.server.js';

const router = Router();

router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      activeVolunteers: 142,
      openGates: 12,
      criticalAlerts: 2
    }
  });
});

router.post('/emergency', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ success: false, message: "Message is required" });
  }

  try {
    const io = getIO();
    io.to('fans').emit('emergency-broadcast', { message, timestamp: new Date().toISOString() });
    res.status(200).json({ success: true, message: "Broadcast sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Socket server not initialized" });
  }
});

export default router;
