import { Document, Types } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  division?: string;
  district?: string;
  upazila?: string;
  password?: string;
  role?: string;
  totalOrders: number;
  totalSpent: number;
  activity: {
    orderId?: Types.ObjectId | string;
    type: 'order_created' | 'return' | 'cancel' | 'receive' | 'status_change';
    status?: string;
    date: Date;
    note?: string;
  }[];
}
