export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  HR_ADMIN: 'hr_admin',
  CONTENT_MANAGER: 'content_manager',
  EDITOR: 'editor',
}

export const PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: {
    canManageAll: true,
    canManageUsers: true,
    canManageSettings: true,
    canDeleteData: true,
  },
  [ROLES.ADMIN]: {
    canManageAll: true,
    canManageUsers: false,
    canManageSettings: true,
    canDeleteData: true,
  },
  [ROLES.HR_ADMIN]: {
    canManageAll: false,
    canManageUsers: false,
    canManageSettings: false,
    canDeleteData: false,
    allowedMenus: ['career', 'team'],
  },
  [ROLES.CONTENT_MANAGER]: {
    canManageAll: false,
    canManageUsers: false,
    canManageSettings: false,
    canDeleteData: false,
    allowedMenus: ['pages', 'hero', 'services', 'portfolio', 'blog', 'testimonials'],
  },
  [ROLES.EDITOR]: {
    canManageAll: false,
    canManageUsers: false,
    canManageSettings: false,
    canDeleteData: false,
    allowedMenus: ['blog', 'pages'],
  },
}