import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('MONGO_URI is not set in .env. Skipping MongoDB connection and running in Mock mode.');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Backend will continue to run with limited functionality (Mock mode fallback or pending DB).');
    // We do NOT call process.exit(1) so the app stays alive for existing features
  }
};
