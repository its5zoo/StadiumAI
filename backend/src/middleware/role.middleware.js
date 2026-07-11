// Placeholder for future role-based access control
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // TODO: Check if user role is in allowedRoles
    next();
  };
};
