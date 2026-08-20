import { Router } from 'express';
import { 
  createTicket, 
  getMyTickets, 
  getAllTickets, 
  getTicketDetails, 
  replyToTicket, 
  updateTicketStatus,
  deleteTicket
} from './support.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.post('/ticket', authMiddleware(), createTicket);
router.get('/my-tickets', authMiddleware(), getMyTickets);
router.get('/ticket/:id', authMiddleware(), getTicketDetails);
router.post('/ticket/:id/reply', authMiddleware(), replyToTicket);

router.get('/all-tickets', authMiddleware('admin'), getAllTickets);
router.patch('/ticket/:id/status', authMiddleware('admin'), updateTicketStatus);
router.delete('/ticket/:id', authMiddleware('admin'), deleteTicket);

export const SupportRoutes = router;
