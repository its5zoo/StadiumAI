import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: 1, message: "Gate 5 is currently crowded. Please use Gate 4.", time: "2 min ago", type: "warning" },
      { id: 2, message: "Food Court A is running a 20% discount for the next hour!", time: "10 min ago", type: "info" }
    ]
  });
});

export default router;
