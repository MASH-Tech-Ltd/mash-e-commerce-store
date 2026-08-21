import { Request, Response } from 'express';
import { ThemeService } from './theme.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { uploadCloudinary, deleteCloudinary } from '../../helpers/cloudinary';

const updateTheme = asyncHandler(async (req: Request, res: Response) => {
  if (req.body.footer && typeof req.body.footer === 'string') {
    try {
      req.body.footer = JSON.parse(req.body.footer);
    } catch (e) {
      // Keep as string or handle error
    }
  }

  if (req.body.storeInfo && typeof req.body.storeInfo === 'string') {
    try {
      req.body.storeInfo = JSON.parse(req.body.storeInfo);
    } catch (e) {
      // Keep as string or handle error
    }
  }
  
  if (req.body.existingBanners && typeof req.body.existingBanners === 'string') {
    try {
      req.body.banners = JSON.parse(req.body.existingBanners);
    } catch (e) {
      req.body.banners = [];
    }
  } else if (!req.body.banners) {
    req.body.banners = [];
  }

  // Fetch existing theme to compare banners
  const existingTheme = await ThemeService.getTheme();
  const oldBanners = existingTheme?.banners || [];

  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const uploadResult = await uploadCloudinary(file.path);
      req.body.banners.push({
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      });
    }
  }

  // Find and delete removed banners from Cloudinary
  const newBannerIds = req.body.banners.map((b: any) => b.public_id);
  const bannersToDelete = oldBanners.filter((oldBanner: any) => oldBanner.public_id && !newBannerIds.includes(oldBanner.public_id));
  
  for (const banner of bannersToDelete) {
    try {
      await deleteCloudinary(banner.public_id);
    } catch (err) {
      console.error(`Failed to delete banner from Cloudinary: ${banner.public_id}`, err);
    }
  }

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
