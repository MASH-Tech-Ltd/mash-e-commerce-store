import { Router } from 'express';
import { CustomerController } from './customer.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.post('/create-customer', authMiddleware('admin'), CustomerController.createCustomer);
router.get('/get-paginated-customers', authMiddleware('admin'), CustomerController.getPaginatedCustomers);

export const CustomerRoutes = router;
