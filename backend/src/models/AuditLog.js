import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // String to support both Mongo ID and 'anonymous'
  action: { type: String, required: true },
  route: { type: String, required: true },
  ip: { type: String },
  role: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
