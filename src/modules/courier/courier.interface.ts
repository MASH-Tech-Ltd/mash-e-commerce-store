import { Document, Types } from 'mongoose';

export interface ICourier extends Document {
  insideDhaka: number;
  outsideDhaka: number;
  provider?: string;
  clientId?: string;
  apiSecret?: string;
  autoForward?: boolean;
}
