import { Router } from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/multer.middleware';

const router = Router();

router.post('/create-product', authMiddleware('admin'), upload.array('images', 5), ProductController.createProduct);
router.get('/check-limit', authMiddleware('admin'), ProductController.checkProductLimit);
router.get('/get-all-product', ProductController.getAllProducts);
router.get('/get-product/:id', ProductController.getSingleProduct);
router.patch('/update-product/:id', authMiddleware('admin'), upload.array('images', 5), ProductController.updateProduct);
router.delete('/delete-product/:id', authMiddleware('admin'), ProductController.deleteProduct);

export const ProductRoutes = router;
