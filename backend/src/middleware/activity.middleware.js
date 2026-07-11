import auditRepository from '../repositories/audit.repository.js';

export const logActivity = (action) => {
  return async (req, res, next) => {
    // Fire and forget logging
    try {
      const auditData = {
        userId: req.user ? req.user.id : 'anonymous',
        role: req.user ? req.user.role : 'GUEST',
        action: action,
        route: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress
      };

      await auditRepository.logAction(auditData);
    } catch (error) {
      // Don't block the request if logging fails
      console.error('Audit logging failed', error);
    }
    
    next();
  };
};
