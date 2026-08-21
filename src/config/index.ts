import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.string().url("A valid MongoDB connection string must be provided in DATABASE_URL"),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_RESET_PASSWORD_SECRET: z.string().min(1, "JWT_RESET_PASSWORD_SECRET is required").default('super_secret_reset_password_key'),
  JWT_RESET_PASSWORD_EXPIRES_IN: z.string().default('5m'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),
  ADMIN_EMAIL: z.string().email().default('admin@demo.com'),
  ADMIN_PASSWORD: z.string().default('admin123'),
  BASE_DOMAIN: z.string().default('localhost'),
  SERVER_URL: z.string().url().default('http://localhost:8000'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error("❌ Invalid environment variables:", envParsed.error.format());
  process.exit(1);
}

const env = envParsed.data;

export default {
  env: env.NODE_ENV,
  port: env.PORT,
  database_url: env.DATABASE_URL,
  frontendUrl: env.FRONTEND_URL,
  allowed_origins: env.ALLOWED_ORIGINS,
  jwt_secret: env.JWT_SECRET,
  jwt_expires_in: env.JWT_EXPIRES_IN,
  jwt_refresh_secret: env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: env.JWT_REFRESH_EXPIRES_IN,
  jwt_reset_password_secret: env.JWT_RESET_PASSWORD_SECRET,
  jwt_reset_password_expires_in: env.JWT_RESET_PASSWORD_EXPIRES_IN,
  bcrypt_salt_rounds: env.BCRYPT_SALT_ROUNDS,
  admin_email: env.ADMIN_EMAIL,
  admin_password: env.ADMIN_PASSWORD,
  base_domain: env.BASE_DOMAIN,
  server_url: env.SERVER_URL,
  cloudinary: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET,
  },
};
