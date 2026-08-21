import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  ApiResponse.sendSuccess(res, 201, 'User registered successfully', result);
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  ApiResponse.sendSuccess(res, 200, 'User logged in successfully', result);
});

const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await AuthService.refreshAccessToken(refreshToken);
  ApiResponse.sendSuccess(res, 200, 'Token refreshed successfully', result);
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  await AuthService.logout(userId);
  ApiResponse.sendSuccess(res, 200, 'Logged out successfully', null);
});

export const AuthController = {
  register,
  login,
  refresh,
  logout,
};
