import mongoose from 'mongoose';
import { startKeepAliveCron } from '../utils/keepAlive';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI as string;
    await mongoose.connect(mongoURI);
    startKeepAliveCron();
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
