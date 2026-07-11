import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  severity: { type: String, enum: ['LOW', 'MODERATE', 'HIGH'], required: true },
  stadiumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
  zoneId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String }
}, { timestamps: true });

export const Alert = mongoose.model('Alert', alertSchema);
