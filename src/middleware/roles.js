// roles.js

const roles = {
    superadmin: {
      permissions: ['create', 'read', 'update', 'delete'],
    },
    admin: {
      permissions: ['read', 'update'],
    },
    user: {
      permissions: ['read'],
    },
  };
  
  module.exports = roles;
  