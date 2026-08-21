import { Router } from 'express';
import { OrderController } from './order.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validateRequest } from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';

const router = Router();

// Storefront creates order (public)
router.post('/create-order', validateRequest(OrderValidation.createOrderSchema), OrderController.createOrder);

// Dashboard gets orders (protected)
router.get('/get-paginated-orders', authMiddleware('admin'), OrderController.getPaginatedOrders);

// Dashboard updates order (protected)
router.patch('/update-order/:id', authMiddleware('admin'), validateRequest(OrderValidation.updateOrderSchema), OrderController.updateOrder);

// Dashboard deletes order (protected)
router.delete('/delete-order/:id', authMiddleware('admin'), OrderController.deleteOrder);

export const OrderRoutes = router;
