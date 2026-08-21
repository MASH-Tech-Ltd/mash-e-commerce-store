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

const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
  const result = await CustomerService.getCustomerById(req.params.id as string);
  ApiResponse.sendSuccess(res, 200, 'Customer retrieved successfully', result);
});

const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const result = await CustomerService.updateCustomer(req.params.id as string, req.body);
  ApiResponse.sendSuccess(res, 200, 'Customer updated successfully', result);
});

const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
  const result = await CustomerService.deleteCustomer(req.params.id as string);
  ApiResponse.sendSuccess(res, 200, 'Customer deleted successfully', result);
});

export const CustomerController = {
  createCustomer,
  getPaginatedCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
