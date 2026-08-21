import { z } from "zod";

const productVariantSchema = z.object({
  variantName: z.string(),
  originalPrice: z.coerce.number().min(0),
  discountedPrice: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  sku: z.string().optional(),
});

const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    originalPrice: z.coerce.number().min(0),
    discountedPrice: z.coerce.number().min(0),
    saveAmount: z.coerce.number().min(0).optional(),
    badgeText: z.string().optional(),
    features: z.preprocess((val) => {
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return []; }
      }
      return val;
    }, z.array(z.string()).optional()),
    videos: z.preprocess((val) => {
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return []; }
      }
      return val;
    }, z.array(z.string()).optional()),
    isAuthentic: z.coerce.boolean().optional(),
    brand: z.string().optional(),
    weight: z.coerce.number().optional(),
    condition: z.string().optional(),
    status: z.string().optional(),
    sku: z.string().optional(),
    unit: z.string().optional(),
    categoryId: z.string().min(1, "Category ID is required"),
    stock: z.coerce.number().optional(),
    productType: z.enum(['SINGLE', 'VARIANT']).optional(),
    variants: z.preprocess((val) => {
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return []; }
      }
      return val;
    }, z.array(productVariantSchema).optional()),
  }),
});

const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),
});

export const ProductValidation = {
  createProductSchema,
  updateProductSchema,
};
