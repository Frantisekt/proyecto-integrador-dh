import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default api; 