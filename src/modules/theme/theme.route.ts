import { Router } from 'express';
import { ThemeController } from './theme.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/multer.middleware';

const router = Router();

router.put('/update', authMiddleware('admin'), upload.array('banners', 5), ThemeController.updateTheme);
router.get('/get-theme', ThemeController.getTheme);
router.get('/', ThemeController.getTheme); // alias: GET /api/v1/themes

export const ThemeRoutes = router;
