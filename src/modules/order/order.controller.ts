import { Request, Response } from 'express';
import { OrderService } from './order.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);
  ApiResponse.sendSuccess(res, 201, 'Order created successfully', result);
});

const getPaginatedOrders = asyncHandler(async (req: Request, res: Response) => {
  const result = await OrderService.getPaginatedOrders(req.query);
  ApiResponse.sendSuccess(res, 200, 'Orders retrieved successfully', result.data, result.meta);
});

const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.updateOrder(id as string, req.body);
  ApiResponse.sendSuccess(res, 200, 'Order updated successfully', result);
});

const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrder(id as string);
  ApiResponse.sendSuccess(res, 200, 'Order deleted successfully', result);
});

export const OrderController = {
  createOrder,
  getPaginatedOrders,
  updateOrder,
  deleteOrder,
};
