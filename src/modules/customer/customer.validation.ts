import { z } from "zod";

const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email().optional(),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
  }),
});

const updateCustomerSchema = z.object({
  body: createCustomerSchema.shape.body.partial(),
});

export const CustomerValidation = {
  createCustomerSchema,
  updateCustomerSchema,
};
