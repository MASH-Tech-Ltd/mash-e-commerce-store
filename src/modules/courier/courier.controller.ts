import { Request, Response } from 'express';
import { CourierService } from './courier.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const getCourierCharge = asyncHandler(async (req: Request, res: Response) => {
  const result = await CourierService.getCourierCharge();
  ApiResponse.sendSuccess(res, 200, 'Courier charges retrieved', result);
});

const updateCourierCharge = asyncHandler(async (req: Request, res: Response) => {
  const result = await CourierService.updateCourierCharge(req.body);
  ApiResponse.sendSuccess(res, 200, 'Courier charges updated successfully', result);
});

const saveCredentials = asyncHandler(async (req: Request, res: Response) => {
  const result = await CourierService.saveCredentials(req.body);
  ApiResponse.sendSuccess(res, 200, 'Courier credentials saved', result);
});

const getAllCredentials = asyncHandler(async (req: Request, res: Response) => {
  const result = await CourierService.getAllCredentials();
  ApiResponse.sendSuccess(res, 200, 'All courier credentials retrieved', result);
});

export const CourierController = {
  getCourierCharge,
  updateCourierCharge,
  saveCredentials,
  getAllCredentials,
};
