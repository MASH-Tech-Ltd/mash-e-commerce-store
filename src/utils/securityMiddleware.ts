import { Request, Response, NextFunction } from 'express';
import { SecurityLog, BlockedIp } from '../modules/security/security.model';
import { logger } from './logger';

// Middleware to block IPs that are in the database
export const ipBlocker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    
    // Skip checking if IP is unknown or local development
    if (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
      return next();
    }

    const blocked = await BlockedIp.findOne({ ipAddress: ip, isBlocked: true });
    
    if (blocked) {
      return res.status(403).json({
        success: false,
        message: 'Your IP has been blocked due to suspicious activity.'
      });
    }

    next();
  } catch (error) {
    // If DB fails, let request pass so we don't bring down the whole app
    logger.error('Error in ipBlocker middleware', error);
    next();
  }
};

// Middleware to detect and automatically block bots/hackers
export const botDetector = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  
  if (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
    return next();
  }

  const suspiciousPaths = [
    '.env',
    '.git',
    'wp-admin',
    'wp-login.php',
    'config.php',
    'phpinfo.php',
    'admin.php'
  ];

  const isSuspicious = suspiciousPaths.some(path => req.originalUrl.includes(path));

  if (isSuspicious) {
    try {
      // Add to blocked IPs
      const existing = await BlockedIp.findOne({ ipAddress: ip });
      if (!existing) {
        await BlockedIp.create({
          ipAddress: ip,
          reason: `Automatic block: Attempted to access ${req.originalUrl}`,
          isBlocked: true
        });
      } else {
        existing.isBlocked = true;
        existing.reason = `Automatic block: Attempted to access ${req.originalUrl}`;
        existing.blockedAt = new Date();
        await existing.save();
      }

      // Log the security event
      await SecurityLog.create({
        ipAddress: ip,
        action: 'AUTO_BLOCK_BOT',
        endpoint: req.originalUrl,
        method: req.method,
        userAgent: req.headers['user-agent'] || 'Unknown',
        severity: 'critical',
        details: `Automatically blocked IP for accessing suspicious path: ${req.originalUrl}`
      });

      logger.warn(`Automatically blocked IP ${ip} for accessing ${req.originalUrl}`);

      return res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    } catch (error) {
      logger.error('Error in botDetector middleware', error);
    }
  }

  next();
};
