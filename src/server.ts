import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from '@modules/task/task.routes';
import { errorHandler } from '@middleware/error';
import { connectDB, disconnectDB } from '@lib/db';
import { logger } from '@lib/logger';
import { ApiError } from '@lib/errors';
import { requestLogger } from '@middleware/requestLogger';
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Move request logger before routes

// Routes
app.use('/tasks', taskRoutes);

// Error Handler (should be last)
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Graceful shutdown handler
const handleShutdown = async (signal: string) => {
  try {
    logger.info(`${signal} received. Shutting down gracefully...`);
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', {
      signal,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

// Start server
async function startServer() {
  try {
    // Check database connection
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Internal server error occurred during startup';

    logger.error('Failed to start server:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });

    console.error('\x1b[31m%s\x1b[0m', `Error: ${errorMessage}`);
    process.exit(1);
  }
}

startServer();
