import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedDemoStorefront } from './src/utils/seedStorefront';

dotenv.config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('✅ ডেটাবেজে সংযুক্ত হয়েছে।');
    
    // Drop existing to force re-seed
    if (mongoose.connection.db) {
      await mongoose.connection.db.collection('products').deleteMany({});
      await mongoose.connection.db.collection('categories').deleteMany({});
    }
    
    await seedDemoStorefront();
    
    console.log('Seeding complete. Exiting.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
