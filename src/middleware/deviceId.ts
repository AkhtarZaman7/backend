import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@lib/errors';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      deviceId?: string;
    }
  }
}

export const validateDeviceId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const deviceId = req.header('X-Device-ID');
  
  if (!deviceId) {
    throw new ApiError(400, 'Device ID is required');
  }

  req.deviceId = deviceId;
  next();
}; 