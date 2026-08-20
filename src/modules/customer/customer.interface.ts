import { Document, Types } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email?: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
}
