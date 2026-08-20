import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/electronics',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  jwt_secret: process.env.JWT_SECRET || 'secret',
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '30d',
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  admin_email: process.env.ADMIN_EMAIL || 'admin@demo.com',
  admin_password: process.env.ADMIN_PASSWORD || 'admin123',
  base_domain: process.env.BASE_DOMAIN || 'localhost',
  server_url: process.env.SERVER_URL || `http://localhost:${process.env.PORT || 8000}`,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
