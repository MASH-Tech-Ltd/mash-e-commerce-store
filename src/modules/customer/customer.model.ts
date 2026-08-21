import { Schema, model } from 'mongoose';
import { ICustomer } from './customer.interface';

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    address: { type: String },
    division: { type: String },
    district: { type: String },
    upazila: { type: String },
    password: { type: String, select: false },
    role: { type: String, default: 'customer' },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    activity: [
      {
        orderId: { type: Schema.Types.Mixed },
        type: { type: String, required: true },
        status: { type: String },
        date: { type: Date, default: Date.now },
        note: { type: String },
      }
    ]
  },
  {
    timestamps: true,
  }
);

export const Customer = model<ICustomer>('Customer', customerSchema);
