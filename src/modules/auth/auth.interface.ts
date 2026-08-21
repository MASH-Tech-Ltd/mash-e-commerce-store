import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string; // Optional for OAuth
  role: 'admin';
  name: string;
  phone?: string;
  address?: string;
  details?: string;
  avatar?: {
    public_id?: string;
    secure_url?: string;
  };
  refreshToken?: string;
}
