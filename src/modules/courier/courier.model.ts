import { Schema, model } from 'mongoose';
import { ICourier } from './courier.interface';

const courierSchema = new Schema<ICourier>(
  {
    insideDhaka: { type: Number, required: true, default: 60 },
    outsideDhaka: { type: Number, required: true, default: 120 },
    provider: { type: String },
    clientId: { type: String },
    apiSecret: { type: String },
    autoForward: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Courier = model<ICourier>('Courier', courierSchema);
