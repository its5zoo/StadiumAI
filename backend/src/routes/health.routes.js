import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "System healthy",
    data: {
      status: "ok"
    }
  });
});

export default router;
