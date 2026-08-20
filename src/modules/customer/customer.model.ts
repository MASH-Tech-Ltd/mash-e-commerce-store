import { Schema, model } from 'mongoose';
import { ICustomer } from './customer.interface';

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'customer' },
    totalSpent: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Customer = model<ICustomer>('Customer', customerSchema);
