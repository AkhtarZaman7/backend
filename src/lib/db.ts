import prisma from './prisma';
import { logger } from './logger';
import { ApiError } from './errors';

export async function connectDB() {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    logger.error('Database connection failed:', {
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
    throw new ApiError(500, 'Failed to connect to database. Please check config/config.ts');
  }
}

export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    logger.error('Database disconnection failed:', {
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
    throw new ApiError(500, 'Error disconnecting from database');
  }
} 