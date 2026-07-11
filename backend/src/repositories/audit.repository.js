import { AuditLog } from '../models/AuditLog.js';

class AuditRepository {
  async logAction(auditData) {
    try {
      const log = new AuditLog(auditData);
      await log.save();
    } catch (error) {
      console.error("Failed to write audit log:", error);
    }
  }
}

export default new AuditRepository();
