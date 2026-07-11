import { Router } from 'express';
import { ROLES } from '../constants/roles.js';
import { authenticate, authorizeRole } from '../middleware/auth.middleware.js';

const router = Router();

// Apply auth middleware to all organizer routes
router.use(authenticate);
router.use(authorizeRole(ROLES.ORGANIZER, ROLES.ADMIN));

router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      fansInside: 45200,
      gateUtilization: "82%",
      parkingOccupancy: "95%",
      emergencyCases: 2,
      activeAlerts: 4
    }
  });
});

router.get('/heatmap', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: "gate-1", name: "Gate 1 (North)", status: "SAFE", density: 30 },
      { id: "gate-4", name: "Gate 4 (South)", status: "MODERATE", density: 60 },
      { id: "gate-5", name: "Gate 5 (West)", status: "CONGESTED", density: 95 }
    ]
  });
});

router.get('/incidents', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, severity: "HIGH", zone: "Gate 5", time: new Date().toISOString(), status: "OPEN", desc: "Extreme crowding detected." },
      { id: 2, severity: "MEDIUM", zone: "Parking A", time: new Date(Date.now() - 3600000).toISOString(), status: "RESOLVING", desc: "Traffic jam near exit." }
    ]
  });
});

// A fallback broadcast API for manual REST triggering if sockets fail
router.post('/broadcast', (req, res) => {
  const { type, message } = req.body;
  res.json({ success: true, message: "Broadcast dispatched successfully via fallback." });
});

router.post('/recommendations', (req, res) => {
  res.json({
    success: true,
    data: [
      "Open Gate 6 immediately to relieve Gate 5 congestion.",
      "Deploy 5 volunteers to Parking A."
    ]
  });
});

export default router;
