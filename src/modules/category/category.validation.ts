import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),
    isActive: z.coerce.boolean().optional(),
  }),
});

const updateCategorySchema = z.object({
  body: createCategorySchema.shape.body.partial(),
});

export const CategoryValidation = {
  createCategorySchema,
  updateCategorySchema,
};
