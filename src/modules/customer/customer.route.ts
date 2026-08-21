import { Router } from 'express';
import { CustomerController } from './customer.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validateRequest } from '../../middleware/validateRequest';
import { CustomerValidation } from './customer.validation';

const router = Router();

router.post('/create-customer', authMiddleware('admin'), validateRequest(CustomerValidation.createCustomerSchema), CustomerController.createCustomer);
router.get('/get-paginated-customers', authMiddleware('admin'), CustomerController.getPaginatedCustomers);

router.get('/:id', authMiddleware('admin'), CustomerController.getCustomerById);
router.patch('/:id', authMiddleware('admin'), validateRequest(CustomerValidation.updateCustomerSchema), CustomerController.updateCustomer);
router.delete('/:id', authMiddleware('admin'), CustomerController.deleteCustomer);

export const CustomerRoutes = router;
