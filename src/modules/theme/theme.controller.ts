import { Request, Response } from 'express';
import { ThemeService } from './theme.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const updateTheme = asyncHandler(async (req: Request, res: Response) => {
  const result = await ThemeService.updateTheme(req.body);
  ApiResponse.sendSuccess(res, 200, 'Theme updated successfully', result);
});

const getTheme = asyncHandler(async (req: Request, res: Response) => {
  const result = await ThemeService.getTheme();
  ApiResponse.sendSuccess(res, 200, 'Theme retrieved successfully', result);
});

export const ThemeController = {
  updateTheme,
  getTheme,
};
