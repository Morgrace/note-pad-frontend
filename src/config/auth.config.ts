export const AUTH_CONFIG = {
  // API endpoints
  API_BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api/v1',

  // Storage
  PERSIST_KEY: 'auth-storage',
  DEVTOOLS_NAME: 'AuthStore',

  LOGIN_ROUTE: '/login',
  SIGNUP_ROUTE: '/signup',
  HOME_ROUTE: '/',
  PROFILE_ROUTE: '/profile',
  NOTES_ROUTE: '/notes',
} as const
