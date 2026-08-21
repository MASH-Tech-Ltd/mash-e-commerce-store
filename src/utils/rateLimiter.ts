import rateLimit from 'express-rate-limit';
import ApiResponse from './apiResponse';

export const createRateLimiter = (
  windowMs: number,
  maxRequests: number,
  message: string = 'Too many requests, please try again later.'
) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    handler: (req, res) => {
      ApiResponse.sendError(res, 429, message);
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export const globalLimiter = createRateLimiter(
  15 * 60 * 1000, 
  1000, 
  'Too many requests from this IP, please try again after 15 minutes'
);

export const authLimiter = createRateLimiter(
  15 * 60 * 1000, 
  20, 
  'Too many login attempts from this IP, please try again after 15 minutes'
);
