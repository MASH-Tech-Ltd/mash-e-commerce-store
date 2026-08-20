import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.get('/dashboard-stats', authMiddleware('admin'), AnalyticsController.getDashboardStats);

export const AnalyticsRoutes = router;
