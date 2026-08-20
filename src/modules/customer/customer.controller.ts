import { Request, Response } from 'express';
import { CustomerService } from './customer.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const result = await CustomerService.createCustomer(req.body);
  ApiResponse.sendSuccess(res, 201, 'Customer created successfully', result);
});

const getPaginatedCustomers = asyncHandler(async (req: Request, res: Response) => {
  const result = await CustomerService.getPaginatedCustomers(req.query);
  ApiResponse.sendSuccess(res, 200, 'Customers retrieved successfully', result.data, result.meta);
});

export const CustomerController = {
  createCustomer,
  getPaginatedCustomers,
};
