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
            console.log('Intentando login admin con:', {
                email: credentials.email,
                password: '***'
            });
            
            const response = await api.post(ENDPOINTS.AUTH.ADMIN_LOGIN, credentials);
            
            console.log('Respuesta del servidor:', response.data);

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            if (!response.data.token) {
                throw new Error('No se recibió el token de autenticación');
            }

            // Verificar rol
            if (response.data.role !== 'ADMIN') {
                throw new Error('Acceso denegado: No tienes permisos de administrador');
            }

            // Guardar datos y token
            localStorage.setItem('adminData', JSON.stringify(response.data));
            localStorage.setItem('isAdminLoggedIn', 'true');
            
            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }

            return response.data;
        } catch (error) {
            console.error('Error en login admin:', error);
            console.error('Detalles del error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            
            if (error.response?.status === 403) {
                throw new Error('Acceso denegado. Verifica tus credenciales de administrador.');
            }

            throw new Error(
                error.response?.data?.error || 
                error.message || 
                'Error al iniciar sesión como administrador'
            );
        }
    },

    isAdminLoggedIn: () => {
        return localStorage.getItem('isAdminLoggedIn') === 'true';
    },

    adminLogout: () => {
        localStorage.removeItem('adminData');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('isAdminLoggedIn');
        delete api.defaults.headers.common['Authorization'];
    },

    getAdminData: () => {
        try {
            const adminData = localStorage.getItem('adminData');
            return adminData ? JSON.parse(adminData) : null;
        } catch (error) {
            console.error('Error al obtener datos del admin:', error);
            return null;
        }
    }
}; 