import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from '../config/api.config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const headers = getAuthHeader();
    config.headers = {
      ...config.headers,
      ...headers
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 