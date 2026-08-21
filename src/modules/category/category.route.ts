import { Router } from 'express';
import { CategoryController } from './category.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/multer.middleware';
import { validateRequest } from '../../middleware/validateRequest';
import { CategoryValidation } from './category.validation';

const router = Router();

router.post('/create-category', authMiddleware('admin'), upload.single('image'), validateRequest(CategoryValidation.createCategorySchema), CategoryController.createCategory);
router.get('/get-paginated-categories', CategoryController.getPaginatedCategories);
router.get('/get-all-category', CategoryController.getAllCategories);
router.get('/get-category/:id', authMiddleware('admin'), CategoryController.getSingleCategory);
router.patch('/update-category/:id', authMiddleware('admin'), upload.single('image'), validateRequest(CategoryValidation.updateCategorySchema), CategoryController.updateCategory);
router.delete('/delete-category/:id', authMiddleware('admin'), CategoryController.deleteCategory);

export const CategoryRoutes = router;