import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import ApiResponse from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';
import { uploadCloudinary, deleteCloudinary } from "../../helpers/cloudinary";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  if (req.file) {
    const uploadResult = await uploadCloudinary(req.file.path);
    req.body.image = {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url
    };
  }

  const result = await CategoryService.createCategory(req.body);
  ApiResponse.sendSuccess(res, 201, 'Category created successfully', result);
});

const getPaginatedCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await CategoryService.getPaginatedCategories(req.query);
  ApiResponse.sendSuccess(res, 200, 'Categories retrieved successfully', result.data, result.meta);
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();
  ApiResponse.sendSuccess(res, 200, 'All Categories retrieved successfully', result);
});

const getSingleCategory = asyncHandler(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleCategory(req.params.id as string);
  if (!result) {
    return ApiResponse.sendError(res, 404, 'Category not found');
  }
  ApiResponse.sendSuccess(res, 200, 'Category retrieved successfully', result);
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  if (req.file) {
    // If a new file is uploaded, delete the old one first
    const existingCategory = await CategoryService.getSingleCategory(req.params.id as string);
    if (existingCategory && existingCategory.image && existingCategory.image.public_id) {
      try {
        await deleteCloudinary(existingCategory.image.public_id);
      } catch (e) {
        console.error(`Failed to delete old category image: ${existingCategory.image.public_id}`, e);
      }
    }

    const uploadResult = await uploadCloudinary(req.file.path);
    req.body.image = {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url
    };
  } else if (req.body.removeImage === 'true') {
    const existingCategory = await CategoryService.getSingleCategory(req.params.id as string);
    if (existingCategory && existingCategory.image && existingCategory.image.public_id) {
      try {
        await deleteCloudinary(existingCategory.image.public_id);
      } catch (e) {
        console.error(`Failed to delete category image on removal: ${existingCategory.image.public_id}`, e);
      }
    }
    req.body.image = null;
  }

  const result = await CategoryService.updateCategory(req.params.id as string, req.body);
  if (!result) {
    return ApiResponse.sendError(res, 404, 'Category not found');
  }
  ApiResponse.sendSuccess(res, 200, 'Category updated successfully', result);
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const existingCategory = await CategoryService.getSingleCategory(req.params.id as string);
  if (existingCategory && existingCategory.image && existingCategory.image.public_id) {
    try {
      await deleteCloudinary(existingCategory.image.public_id);
    } catch (e) {
      console.error(`Failed to delete category image on deletion: ${existingCategory.image.public_id}`, e);
    }
  }

  const result = await CategoryService.deleteCategory(req.params.id as string);
  if (!result) {
    return ApiResponse.sendError(res, 404, 'Category not found');
  }
  ApiResponse.sendSuccess(res, 200, 'Category deleted successfully', result);
});

export const CategoryController = {
  createCategory,
  getPaginatedCategories,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
