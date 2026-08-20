import { Router } from 'express';
import { ThemeController } from './theme.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.put('/update', authMiddleware('admin'), ThemeController.updateTheme);
router.get('/get-theme', ThemeController.getTheme);
router.get('/', ThemeController.getTheme); // alias: GET /api/v1/themes

export const ThemeRoutes = router;
