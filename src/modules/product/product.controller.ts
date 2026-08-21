import { Request, Response } from "express";
import { ProductService } from "./product.service";
import ApiResponse from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { uploadCloudinary, deleteCloudinary } from "../../helpers/cloudinary";
import { Product } from "./product.model";

const createProduct = asyncHandler(async (req: Request, res: Response) => {

  if (req.body.features && typeof req.body.features === "string") {
    try {
      req.body.features = JSON.parse(req.body.features);
    } catch (e) {
      req.body.features = [];
    }
  }

  if (req.body.videos && typeof req.body.videos === "string") {
    try {
      req.body.videos = JSON.parse(req.body.videos);
    } catch (e) {
      req.body.videos = [];
    }
  }

  if (req.body.isAuthentic !== undefined) {
    req.body.isAuthentic = req.body.isAuthentic === "true";
  }

  if (req.body.dimensions && typeof req.body.dimensions === "string") {
    try {
      req.body.dimensions = JSON.parse(req.body.dimensions);
    } catch (e) {
      delete req.body.dimensions;
    }
  }

  if (req.body.specifications && typeof req.body.specifications === "string") {
    try {
      req.body.specifications = JSON.parse(req.body.specifications);
    } catch (e) {
      req.body.specifications = [];
    }
  }

  if (req.body.variants && typeof req.body.variants === "string") {
    try {
      req.body.variants = JSON.parse(req.body.variants);
    } catch (e) {
      req.body.variants = [];
    }
  }

  req.body.images = [];
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const uploadResult = await uploadCloudinary(file.path);
      req.body.images.push({
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      });
    }
  }

  const result = await ProductService.createProduct(req.body);
  ApiResponse.sendSuccess(res, 201, "Product created successfully", result);
});

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(req.query);
  ApiResponse.sendSuccess(res, 200, "Products retrieved successfully", result.data, result.meta);
});



const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.getSingleProduct(req.params.id as string);
  ApiResponse.sendSuccess(res, 200, "Product retrieved successfully", result);
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  if (req.body.features && typeof req.body.features === "string") {
    try {
      req.body.features = JSON.parse(req.body.features);
    } catch (e) {
      delete req.body.features;
    }
  }

  if (req.body.videos && typeof req.body.videos === "string") {
    try {
      req.body.videos = JSON.parse(req.body.videos);
    } catch (e) {
      delete req.body.videos;
    }
  }

  if (req.body.dimensions && typeof req.body.dimensions === "string") {
    try {
      req.body.dimensions = JSON.parse(req.body.dimensions);
    } catch (e) {
      delete req.body.dimensions;
    }
  }

  if (req.body.specifications && typeof req.body.specifications === "string") {
    try {
      req.body.specifications = JSON.parse(req.body.specifications);
    } catch (e) {
      delete req.body.specifications;
    }
  }

  if (req.body.variants && typeof req.body.variants === "string") {
    try {
      req.body.variants = JSON.parse(req.body.variants);
    } catch (e) {
      delete req.body.variants;
    }
  }

  if (req.body.isAuthentic !== undefined) {
    req.body.isAuthentic = req.body.isAuthentic === "true";
  }

  let existingImages = [];
  if (req.body.existingImages) {
    try {
      existingImages = JSON.parse(req.body.existingImages);
    } catch (e) {
      existingImages = [];
    }
  }

  let newImages = [];
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    for (const file of req.files) {
      const uploadResult = await uploadCloudinary(file.path);
      newImages.push({
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      });
    }
  }

  if (req.body.existingImages !== undefined || newImages.length > 0) {
    req.body.images = [...existingImages, ...newImages];
  }

  // Find removed images and delete them from Cloudinary
  const existingProduct = await ProductService.getSingleProduct(req.params.id as string);
  if (existingProduct && existingProduct.images) {
    const newImageIds = req.body.images ? req.body.images.map((img: any) => img.public_id) : [];
    const imagesToDelete = existingProduct.images.filter((oldImg: any) => oldImg.public_id && !newImageIds.includes(oldImg.public_id));
    
    for (const img of imagesToDelete) {
      try {
        await deleteCloudinary(img.public_id);
      } catch (err) {
        console.error(`Failed to delete product image from Cloudinary: ${img.public_id}`, err);
      }
    }
  }

  const result = await ProductService.updateProduct(
    req.params.id as string,
    req.body,
  );
  ApiResponse.sendSuccess(res, 200, "Product updated successfully", result);
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const existingProduct = await ProductService.getSingleProduct(req.params.id as string);
  if (existingProduct && existingProduct.images) {
    for (const img of existingProduct.images) {
      if (img.public_id) {
        try {
          await deleteCloudinary(img.public_id);
        } catch (err) {
          console.error(`Failed to delete product image on deletion: ${img.public_id}`, err);
        }
      }
    }
  }

  const result = await ProductService.deleteProduct(req.params.id as string);
  ApiResponse.sendSuccess(res, 200, "Product deleted successfully", result);
});

const checkProductLimit = asyncHandler(async (req: Request, res: Response) => {
  // In a single-user system, there is no product limit based on subscription.
  ApiResponse.sendSuccess(res, 200, "Limit check passed", { allowed: true });
});


export const ProductController = {
  createProduct,
  checkProductLimit,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
