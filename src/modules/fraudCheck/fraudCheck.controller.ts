import { Request, Response } from 'express';
import { FraudCheckService } from './fraudCheck.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const checkFraud = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.body;

  if (!orderId) {
    return ApiResponse.sendError(res, 400, 'Order ID is required');
  }

  const result = await FraudCheckService.checkFraud(orderId);
  ApiResponse.sendSuccess(res, 200, 'Fraud check completed', result);
});

const getAllFraudChecks = asyncHandler(async (req: Request, res: Response) => {
  const result = await FraudCheckService.getAllFraudChecks();
  ApiResponse.sendSuccess(res, 200, 'All fraud checks retrieved', result);
});

export const FraudCheckController = {
  checkFraud,
  getAllFraudChecks,
};
