import { Request, Response } from 'express';
import { StoreService } from './store.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { uploadCloudinary } from '../../helpers/cloudinary';

const getStore = asyncHandler(async (req: Request, res: Response) => {
  const result = await StoreService.getStore();
  ApiResponse.sendSuccess(res, 200, 'Store retrieved successfully', result);
});

const updateStore = asyncHandler(async (req: Request, res: Response) => {
  const payload = { ...req.body };
  
  if (req.file) {
    const uploadResult = await uploadCloudinary(req.file.path);
    payload.logo = uploadResult.secure_url;
  }
  
  if (payload.checkoutNote !== undefined) {
    payload['settings.checkoutNote'] = payload.checkoutNote;
    delete payload.checkoutNote;
  }
  
  const result = await StoreService.updateStore(payload);
  ApiResponse.sendSuccess(res, 200, 'Store updated successfully', result);
});

export const StoreController = {
  getStore,
  updateStore,
};
