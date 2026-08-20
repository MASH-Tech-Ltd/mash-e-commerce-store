import mongoose from 'mongoose';
import config from '../config/index';
import { startKeepAliveCron } from '../utils/keepAlive';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🛢️ Database is connected successfully');
    startKeepAliveCron();
  } catch (error) {
    console.error('Failed to connect database', error);
    process.exit(1);
  }
};
