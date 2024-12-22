import { Request, Response, NextFunction } from 'express';
import { config } from '@config/config';
import { logger } from '@lib/logger';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchAsync = (eventName: string, fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (config.env !== 'development') {
        logger.error({
          event: eventName,
          error: {
            message: error.message,
            stack: error.stack,
            ...error,
          },
          timestamp: new Date().toISOString(),
        });
      }
      next(error);
    });
  };
}; 