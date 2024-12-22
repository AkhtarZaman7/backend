import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, url, headers, body, ip } = req;

  // Log request
  logger.info('Incoming request', {
    type: 'request',
    method,
    url,
    ip,
    userAgent: headers['user-agent'],
    deviceId: headers['x-device-id'],
    body: method !== 'GET' ? body : undefined,
    timestamp: new Date().toISOString()
  });

  // Capture response using 'finish' event
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      type: 'response',
      method,
      url,
      ip,
      status: res.statusCode,
      duration: `${duration}ms`,
      deviceId: headers['x-device-id'],
      timestamp: new Date().toISOString()
    });
  });

  next();
} 