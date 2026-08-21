import { Router } from 'express';
import { SecurityController } from './security.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// All security routes are protected and only for admins
router.use(authMiddleware('admin'));

router.get('/logs', SecurityController.getSecurityLogs);
router.get('/blocked-ips', SecurityController.getBlockedIps);
router.post('/block', SecurityController.blockIp);
router.post('/unblock', SecurityController.unblockIp);

export const SecurityRoutes = router;
