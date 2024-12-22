export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'nooro_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  }
}; 