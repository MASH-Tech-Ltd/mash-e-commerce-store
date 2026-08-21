import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string(),
  title: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1),
  image: z.string(),
  variantName: z.string().nullable().optional(),
});

const createOrderSchema = z.object({
  body: z.object({
    customerName: z.string().min(1, "Customer name is required"),
    customerPhone: z.string().min(1, "Customer phone is required"),
    shippingAddress: z.string().min(1, "Shipping address is required"),
    division: z.string().optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
    note: z.string().optional(),
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
    subTotal: z.number().min(0),
    shippingCharge: z.number().min(0),
    totalPrice: z.number().min(0),
    paymentStatus: z.enum(["unpaid", "paid"]),
    status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).optional(),
  }),
});

const updateOrderSchema = z.object({
  body: z.object({
    customerName: z.string().optional(),
    customerPhone: z.string().optional(),
    shippingAddress: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
    note: z.string().optional(),
    items: z.array(orderItemSchema).optional(),
    subTotal: z.number().min(0).optional(),
    shippingCharge: z.number().min(0).optional(),
    totalPrice: z.number().min(0).optional(),
    paymentStatus: z.enum(["unpaid", "paid"]).optional(),
    status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).optional(),
  }),
});

export const OrderValidation = {
  createOrderSchema,
  updateOrderSchema,
};
