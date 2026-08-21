import mongoose from 'mongoose';
import config from '../config/index';
import { startKeepAliveCron } from '../utils/keepAlive';
import { logger } from '../utils/logger';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('🛢️ Database is connected successfully');
    startKeepAliveCron();
  } catch (error) {
    logger.error('Failed to connect database', error);
    process.exit(1);
  }
};
