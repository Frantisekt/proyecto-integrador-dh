import axios from 'axios';
import { authService } from './authService';

const API_URL = '/api/v1/favorites';

const getAuthHeaders = () => {
    const user = authService.getCurrentUser();
    if (!user || !user.token) {
        throw new Error('Usuario no autenticado');
    }
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.token}`
    };
};

export const favoriteService = {
    // Añadir un paquete a favoritos
    addToFavorites: async (packageId) => {
        try {
            const response = await axios.post(`${API_URL}/${packageId}`, {}, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            return true;
        } catch (error) {
            console.error('Error al añadir a favoritos:', error);
            if (error.message === 'Usuario no autenticado') {
                return false;
            }
            throw error;
        }
    },

    // Eliminar un paquete de favoritos
    removeFromFavorites: async (packageId) => {
        try {
            const response = await axios.delete(`${API_URL}/${packageId}`, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            return true;
        } catch (error) {
            console.error('Error al eliminar de favoritos:', error);
            if (error.message === 'Usuario no autenticado') {
                return false;
            }
            throw error;
        }
    },

    // Verificar si un paquete está en favoritos
    checkIsFavorite: async (packageId) => {
        try {
            const response = await axios.get(`${API_URL}/check/${packageId}`, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error al verificar favorito:', error);
            return false;
        }
    },

    // Obtener todos los favoritos del usuario
    getUserFavorites: async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            return response.data.favoritePackages || [];
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
            if (error.message === 'Usuario no autenticado') {
                return [];
            }
            return [];
        }
    },

    // Obtener favoritos paginados
    getUserFavoritesPaginated: async (page = 0, size = 10) => {
        try {
            const response = await axios.get(`${API_URL}/paged`, {
                params: { page, size },
                headers: getAuthHeaders(),
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener favoritos paginados:', error);
            if (error.message === 'Usuario no autenticado') {
                return { content: [], totalPages: 0 };
            }
            return { content: [], totalPages: 0 };
        }
    }
}; 