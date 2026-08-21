import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    division: { type: String },
    district: { type: String },
    upazila: { type: String },
    note: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String, required: true },
        variantName: { type: String, default: null },
      }
    ],
    subTotal: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>('Order', orderSchema);
