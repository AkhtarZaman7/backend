import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '@lib/errors';
import { config } from '@config/config';
import { logger } from '@lib/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.env !== 'development') {
    logger.error({
      event: 'global-error',
      error: err,
      path: req.path,
      method: req.method,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors,
    });
  }

  // Default to 500 server error
  return res.status(500).json({
    success: false,
    message: config.env === 'development' ? err.message : 'Internal Server Error',
  });
}; 