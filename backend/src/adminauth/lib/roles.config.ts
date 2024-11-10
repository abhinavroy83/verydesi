export const rolesConfig = {
    admin: {
      defaultPermissions: ['manage_users', 'manage_permissions', 'view_dashboard', 'create_ticket', 'resolve_ticket'],
    },
    manager: {
      defaultPermissions: ['view_dashboard', 'create_ticket', 'resolve_ticket'],
    },
    customer_support: {
      defaultPermissions: ['view_dashboard', 'create_ticket'],
    },
  };
  
  export const allPermissions = [
    'manage_users',
    'manage_permissions',
    'view_dashboard',
    'create_ticket',
    'resolve_ticket',
  ];