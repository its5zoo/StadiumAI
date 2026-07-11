import mongoose from 'mongoose';

const aiQueryLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  question: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const AIQueryLog = mongoose.model('AIQueryLog', aiQueryLogSchema);
