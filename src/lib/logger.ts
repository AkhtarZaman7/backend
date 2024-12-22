import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  const meta = metadata.type ? metadata : { ...metadata, type: 'general' };
  return `${timestamp} [${level}] ${JSON.stringify(meta)}: ${
    typeof message === 'object' ? JSON.stringify(message) : message
  }`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ],
});

// Add request context if needed
export const addRequestContext = (req: any) => {
  return {
    requestId: req.id,
    method: req.method,
    url: req.url,
    deviceId: req.headers['x-device-id'],
  };
};
