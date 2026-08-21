import { Router } from 'express';
import { StoreController } from './store.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/multer.middleware';

const router = Router();

// Public / or user accessible store info
router.get('/my-store', StoreController.getStore);

// Admin update store settings
router.patch('/update-store', authMiddleware('admin'), upload.single('logo'), StoreController.updateStore);

export const StoreRoutes = router;
