import { Document, Types } from 'mongoose';

export interface ISupportMessage {
  senderType: 'USER' | 'ADMIN';
  senderId?: Types.ObjectId;
  message: string;
  createdAt?: Date;
}

export interface ISupportTicket extends Document {
  ticketId: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  messages: ISupportMessage[];
  createdAt: Date;
  updatedAt: Date;
}
