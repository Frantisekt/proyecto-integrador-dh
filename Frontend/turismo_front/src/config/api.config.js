export const API_BASE_URL = 'http://localhost:8087/api/v1';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  TOUR_PACKAGES: {
    BASE: '/tour-packages',
    BY_ID: (id) => `/tour-packages/${id}`
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}; 