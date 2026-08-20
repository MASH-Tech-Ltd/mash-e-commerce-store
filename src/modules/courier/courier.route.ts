import { Router } from 'express';
import { CourierController } from './courier.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Storefront gets charges (public)
router.get('/storefront', CourierController.getCourierCharge);

// Admin route
router.get('/all-credentials', authMiddleware('admin'), CourierController.getAllCredentials);

// Dashboard routes (protected)
router.get('/get-charges', authMiddleware('admin'), CourierController.getCourierCharge);
router.patch('/update-charges', authMiddleware('admin'), CourierController.updateCourierCharge);
router.post('/credentials', authMiddleware('admin'), CourierController.saveCredentials);

export const CourierRoutes = router;
