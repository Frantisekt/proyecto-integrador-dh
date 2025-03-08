import api from './api.service';
import { ENDPOINTS } from '../config/api.config';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', {
                email: credentials.email,
                password: credentials.password
            });
            
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }
            }
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error.response?.data || { 
                message: 'Error al iniciar sesión' 
            };
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', {
                name: userData.name,
                paternalSurname: userData.paternalSurname,
                maternalSurname: userData.maternalSurname,
                username: userData.username,
                email: userData.email,
                password: userData.password,
                dni: userData.dni,
                newsletter: userData.newsletter || "SI",
                role: userData.role || "USER"  // Aseguramos que siempre tenga un valor por defecto
            });
            
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }
                
                alert(`¡Usuario creado exitosamente! Bienvenido ${response.data.username}`);
                console.log('Registro exitoso:', response.data);
            }
            return response.data;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error.response?.data || { message: 'Error al registrar usuario' };
        }
    },
    

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    },

    getCurrentUser: () => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            return null;
        }
    },

    adminLogin: async (credentials) => {
        try {
            const response = await api.post('/auth/admin/login', {
                email: credentials.email,
                password: credentials.password
            });
            
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }
            }
            return response.data;
        } catch (error) {
            console.error('Error en login de admin:', error);
            throw error.response?.data || { 
                message: 'Error al iniciar sesión como administrador' 
            };
        }
    }
}; 