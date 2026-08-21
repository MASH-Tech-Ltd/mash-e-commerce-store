import { z } from 'zod';

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const AuthValidation = {
  loginSchema,
  registerSchema,
};
