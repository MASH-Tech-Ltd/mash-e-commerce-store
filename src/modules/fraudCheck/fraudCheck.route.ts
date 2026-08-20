import { Router } from 'express';
import { FraudCheckController } from './fraudCheck.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Admin routes
router.get(
  '/all',
  authMiddleware('admin'),
  FraudCheckController.getAllFraudChecks
);

router.post(
  '/check',
  authMiddleware('admin'),
  FraudCheckController.checkFraud
);

export const FraudCheckRoutes = router;
