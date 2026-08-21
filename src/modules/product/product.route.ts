import { Router } from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/multer.middleware';
import { validateRequest } from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';

const router = Router();

router.post('/create-product', authMiddleware('admin'), upload.array('images', 5), validateRequest(ProductValidation.createProductSchema), ProductController.createProduct);
router.get('/check-limit', authMiddleware('admin'), ProductController.checkProductLimit);
router.get('/get-all-product', ProductController.getAllProducts);
router.get('/get-product/:id', ProductController.getSingleProduct);
router.patch('/update-product/:id', authMiddleware('admin'), upload.array('images', 5), validateRequest(ProductValidation.updateProductSchema), ProductController.updateProduct);
router.delete('/delete-product/:id', authMiddleware('admin'), ProductController.deleteProduct);

export const ProductRoutes = router;
