import { z } from "zod";

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    details: z.string().optional(),
    role: z.enum(['admin']).optional(),
  }),
});

export const UserValidation = {
  updateUserSchema,
};
