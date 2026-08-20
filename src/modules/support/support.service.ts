import { Types } from 'mongoose';
import { SupportTicket } from './support.model';

export const supportService = {
  async notifyListUpdate(userId?: string) {
    try {
      const io = require('../../socket').getIO();
      const { User } = require('../auth/auth.model');
      const admins = await User.find({ role: 'admin' });
      for (const admin of admins) {
        io.to(`user_${admin._id.toString()}`).emit('refresh_tickets');
      }
      if (userId) {
        io.to(`user_${userId.toString()}`).emit('refresh_tickets');
      }
    } catch (err) {}
  },

  generateTicketId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TKT-';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  async createTicket(subject: string, message: string, userId: string) {
    const ticket = await SupportTicket.create({
      ticketId: this.generateTicketId(),
      subject,
      messages: [
        {
          senderType: 'USER',
          senderId: userId,
          message,
        }
      ]
    });

    await this.notifyListUpdate(userId);

    try {
      const { notificationService } = require('../notification/notification.service');
      const { User } = require('../auth/auth.model');
      
      await notificationService.createNotification(
        userId,
        'TICKET_CREATED',
        'Ticket Created',
        `Your support ticket "${subject}" has been successfully submitted.`,
        ticket._id
      );

      const admins = await User.find({ role: 'admin' });
      for (const admin of admins) {
        await notificationService.createNotification(
          admin._id.toString(),
          'TICKET_CREATED',
          'New Support Ticket',
          `A new support ticket "${subject}" has been created.`,
          ticket._id
        );
        
        try {
          const io = require('../../socket').getIO();
          io.to(`user_${admin._id.toString()}`).emit('new_ticket', ticket);
        } catch (err) {
          console.error('Socket emit new_ticket error:', err);
        }
      }
    } catch (err) {
      console.error('Notification error on create:', err);
    }

    return ticket;
  },

  async getMyTickets(userId: string) {
    return await SupportTicket.find({ 'messages.0.senderId': userId }).sort({ updatedAt: -1 });
  },

  async getAllTickets() {
    return await SupportTicket.find().sort({ updatedAt: -1 });
  },

  async getTicketDetails(ticketId: string) {
    const query: any = { _id: ticketId };
    return await SupportTicket.findOne(query)
      .populate('messages.senderId', 'name email');
  },

  async replyToTicket(ticketId: string, senderType: 'USER' | 'ADMIN', senderId: string, message: string) {
    const query: any = { _id: ticketId };

    const ticket = await SupportTicket.findOne(query);
    if (!ticket) throw new Error('Ticket not found');

    const newMessage = {
      senderType,
      senderId: new Types.ObjectId(senderId),
      message,
    };
    
    if (senderType === 'USER' && ticket.status === 'CLOSED') {
      ticket.status = 'OPEN';
    }

    ticket.messages.push(newMessage as any);
    await ticket.save();
    
    await ticket.populate('messages.senderId', 'name email');
    
    const savedMessage = ticket.messages[ticket.messages.length - 1];

    try {
      const io = require('../../socket').getIO();
      io.to(`ticket_${ticket.ticketId}`).emit('new_message', savedMessage);
    } catch (err) {
      console.error('Socket emit error:', err);
    }

    try {
      const { notificationService } = require('../notification/notification.service');
      const { User } = require('../auth/auth.model');

      if (senderType === 'ADMIN') {
        const creatorId = ticket.messages[0]?.senderId;
        if (creatorId) {
          await notificationService.createNotification(
            creatorId.toString(),
            'TICKET_REPLY',
            'New Reply to Ticket',
            `An admin has replied to your ticket: ${ticket.subject}`,
            ticket._id
          );
        }
      } else {
        const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
          await notificationService.createNotification(
            admin._id.toString(),
            'TICKET_REPLY',
            'New Ticket Reply',
            `A user has replied to ticket: ${ticket.subject}`,
            ticket._id
          );
        }
      }
    } catch (err) {
      console.error('Notification error on reply:', err);
    }

    return ticket;
  },

  async updateTicketStatus(ticketId: string, status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED') {
    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.status = status;
    await ticket.save();

    try {
      const io = require('../../socket').getIO();
      io.to(`ticket_${ticket.ticketId}`).emit('status_changed', status);
      await this.notifyListUpdate(ticket.messages[0]?.senderId?.toString());
    } catch (err) {
      console.error('Socket emit error:', err);
    }

    try {
      const { notificationService } = require('../notification/notification.service');
      const creatorId = ticket.messages[0]?.senderId;
      if (creatorId) {
        await notificationService.createNotification(
          creatorId.toString(),
          'TICKET_STATUS',
          'Ticket Status Updated',
          `Your ticket "${ticket.subject}" has been marked as ${status}.`,
          ticket._id
        );
      }
    } catch (err) {
      console.error('Notification error on status update:', err);
    }

    return ticket;
  },

  async deleteTicket(ticketId: string) {
    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    try {
      const io = require('../../socket').getIO();
      io.to(`ticket_${ticket.ticketId}`).emit('ticket_deleted');
      await this.notifyListUpdate(ticket.messages[0]?.senderId?.toString());
    } catch (err) {
      console.error('Socket emit error:', err);
    }

    await SupportTicket.findByIdAndDelete(ticketId);
    return ticket;
  }
};
