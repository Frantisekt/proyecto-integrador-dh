const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
  }
  // URL por defecto para desarrollo
  return 'http://localhost:3000'; // Usa el puerto de Vite
};

export const API_BASE_URL = `${getApiUrl()}/api/v1`;
export const API_URL = getApiUrl();

// Endpoints específicos
export const ENDPOINTS = {
  AUTH: {
      LOGIN: '/auth/login', // Ruta relativa a API_BASE_URL
      REGISTER: '/auth/register', // Ruta relativa a API_BASE_URL
      ADMIN_LOGIN: '/auth/admin/login' // Ruta relativa a API_BASE_URL
  },
  USERS: '/users', // Ruta relativa a API_BASE_URL
  TOUR_PACKAGES: '/tourPackages', // Ruta relativa a API_BASE_URL
  CATEGORIES: '/categories', // Ruta relativa a API_BASE_URL
  FEATURES: '/features', // Ruta relativa a API_BASE_URL
  MEDIA_PACKAGES: '/media-packages', // Ruta relativa a API_BASE_URL
  MEDIA_CATEGORIES: '/media-categories', // Ruta relativa a API_BASE_URL
  FAVORITES: '/favorites' // Ruta relativa a API_BASE_URL
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};