import { Request, Response, NextFunction } from 'express';
import { SecurityLog, BlockedIp } from './security.model';
import { paginationHelper } from '../../helpers/paginationHelper';

const getSecurityLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = paginationHelper(req.query.page as string | undefined, req.query.limit as string | undefined);
    
    const [data, total] = await Promise.all([
      SecurityLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      SecurityLog.countDocuments()
    ]);
    
    res.status(200).json({
      success: true,
      message: 'Security logs fetched successfully',
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getBlockedIps = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ips = await BlockedIp.find({ isBlocked: true }).sort({ blockedAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Blocked IPs fetched successfully',
      data: ips
    });
  } catch (error) {
    next(error);
  }
};

const blockIp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ipAddress, reason } = req.body;
    
    if (!ipAddress) {
      return res.status(400).json({ success: false, message: 'IP Address is required' });
    }
    
    const existing = await BlockedIp.findOne({ ipAddress });
    if (existing) {
      existing.isBlocked = true;
      existing.reason = reason || 'Manually blocked';
      existing.blockedAt = new Date();
      await existing.save();
    } else {
      await BlockedIp.create({
        ipAddress,
        reason: reason || 'Manually blocked',
        isBlocked: true
      });
    }
    
    // Log it
    await SecurityLog.create({
      ipAddress,
      action: 'MANUAL_BLOCK',
      endpoint: req.originalUrl,
      method: req.method,
      userAgent: req.headers['user-agent'] || 'Unknown',
      severity: 'high',
      details: `Admin manually blocked IP: ${ipAddress}`
    });
    
    res.status(200).json({ success: true, message: 'IP blocked successfully' });
  } catch (error) {
    next(error);
  }
};

const unblockIp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ipAddress } = req.body;
    
    if (!ipAddress) {
      return res.status(400).json({ success: false, message: 'IP Address is required' });
    }
    
    await BlockedIp.findOneAndUpdate({ ipAddress }, { isBlocked: false });
    
    // Log it
    await SecurityLog.create({
      ipAddress,
      action: 'MANUAL_UNBLOCK',
      endpoint: req.originalUrl,
      method: req.method,
      userAgent: req.headers['user-agent'] || 'Unknown',
      severity: 'low',
      details: `Admin manually unblocked IP: ${ipAddress}`
    });
    
    res.status(200).json({ success: true, message: 'IP unblocked successfully' });
  } catch (error) {
    next(error);
  }
};

export const SecurityController = {
  getSecurityLogs,
  getBlockedIps,
  blockIp,
  unblockIp
};
