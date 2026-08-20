import config from '../config/index';
import { User } from '../modules/auth/auth.model';

export const seedAdmin = async () => {
  try {
    const adminEmail = config.admin_email;
    const adminPassword = config.admin_password;

    if (!adminEmail || !adminPassword) {
      console.warn('Admin credentials not provided in env. Skipping seeder.');
      return;
    }

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const admin = new User({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });

      await admin.save();
      console.log('✅ Admin seeded successfully from environment variables.');
    } else {
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log('✅ Admin credentials verified/updated from environment variables.');
    }
  } catch (error) {
    console.error('❌ Failed to seed Admin:', error);
  }
};
