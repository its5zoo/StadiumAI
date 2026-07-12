import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const seedDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return;
    }
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded.');
      return;
    }

    console.log('Seeding initial data...');
    const hashedPassword = await bcrypt.hash('password', 10);

    const fanUser = new User({
      name: 'John Fan',
      email: 'fan@example.com',
      password: hashedPassword,
      role: 'FAN',
      stadiumId: 'stadium-metlife'
    });

    const orgUser = new User({
      name: 'Jane Organizer',
      email: 'org@example.com',
      password: hashedPassword,
      role: 'ORGANIZER',
      stadiumId: 'stadium-metlife'
    });

    await fanUser.save();
    await orgUser.save();
    console.log('Successfully seeded default Fan and Organizer users.');
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
};
