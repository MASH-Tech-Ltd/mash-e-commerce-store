import { Schema, model, Document } from 'mongoose';

export interface ISecurityLog extends Document {
  ipAddress: string;
  action: string;
  endpoint: string;
  method: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details?: string;
  createdAt: Date;
}

const securityLogSchema = new Schema<ISecurityLog>({
  ipAddress: { type: String, required: true, index: true },
  action: { type: String, required: true },
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  userAgent: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  details: { type: String },
}, { timestamps: true });

export const SecurityLog = model<ISecurityLog>('SecurityLog', securityLogSchema);

export interface IBlockedIp extends Document {
  ipAddress: string;
  reason: string;
  isBlocked: boolean;
  blockedAt: Date;
}

const blockedIpSchema = new Schema<IBlockedIp>({
  ipAddress: { type: String, required: true, unique: true, index: true },
  reason: { type: String, required: true },
  isBlocked: { type: Boolean, default: true },
  blockedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const BlockedIp = model<IBlockedIp>('BlockedIp', blockedIpSchema);
