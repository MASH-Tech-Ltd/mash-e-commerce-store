import { Request, Response } from 'express';
import { supportService } from './support.service';

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { subject, message } = req.body;
    const userId = (req as any).user._id;

    const ticket = await supportService.createTicket(subject, message, userId);
    res.status(201).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyTickets = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const tickets = await supportService.getMyTickets(userId);
    res.status(200).json({ success: true, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await supportService.getAllTickets();
    res.status(200).json({ success: true, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTicketDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const ticket = await supportService.getTicketDetails(id as string);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const replyToTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userRole = (req as any).user.role;
    const senderType = userRole === 'admin' ? 'ADMIN' : 'USER';
    const userId = (req as any).user._id;

    const ticket = await supportService.replyToTicket(id as string, senderType, userId, message);
    res.status(200).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const role = (req as any).user.role;
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const ticket = await supportService.updateTicketStatus(id as string, status);
    res.status(200).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = (req as any).user.role;
    
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await supportService.deleteTicket(id as string);
    res.status(200).json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
