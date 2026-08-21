import { Router } from 'express';

import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { authMiddleware } from '../../middleware/authMiddleware';
import { authLimiter } from '../../utils/rateLimiter';
import { validateRequest } from '../../middleware/validateRequest';

const router = Router();

router.post('/register', validateRequest(AuthValidation.registerSchema), AuthController.register);
router.post('/login', authLimiter, validateRequest(AuthValidation.loginSchema), AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', authMiddleware(), AuthController.logout);

export const AuthRoutes = router;
