const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
  }
  // URL por defecto para desarrollo
  return 'http://localhost:8087/';
};

export const API_BASE_URL = ${getApiUrl()}/api/v1;
export const API_URL = getApiUrl();

// Endpoints específicos
export const ENDPOINTS = {
  AUTH: {
      LOGIN: '/api/v1/auth/login',
      REGISTER: '/api/v1/auth/register',
      ADMIN_LOGIN: '/api/v1/auth/admin/login'
  },
  USERS: '/api/v1/users',
  TOUR_PACKAGES: '/api/tourPackages',
  CATEGORIES: '/api/categories',
  FEATURES: '/api/features',
  MEDIA_PACKAGES: '/api/media-packages',
  MEDIA_CATEGORIES: '/api/media-categories',
  FAVORITES: '/api/v1/favorites'
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return token ? { Authorization: Bearer ${token} } : {};
};