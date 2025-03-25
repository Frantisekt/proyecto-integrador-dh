import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8087";
const API_PREFIX = "/api/v1";

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}${API_PREFIX}/tourPackages`,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Interceptor para autenticación (similar a tus otros servicios)
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const tourPackageService = {
    // Obtener paquetes paginados
    getAllPackages: async (page = 0, size = 10, sort = 'title,asc') => {
        try {
            const response = await axiosInstance.get('/paged', {
                params: { page, size, sort }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener paquetes:', {
                url: error.config.url,
                status: error.response?.status,
                data: error.response?.data
            });
            throw new Error(error.response?.data?.message || 'Error al obtener paquetes');
        }
    },

    // Crear nuevo paquete
    create: async (packageData) => {
        try {
            const response = await axiosInstance.post('', packageData);
            return response.data;
        } catch (error) {
            console.error('Error al crear paquete:', error.response?.data);
            throw new Error(error.response?.data?.message || 'Error al crear paquete');
        }
    },

    // Obtener paquete por ID
    getById: async (id) => {
        try {
            const response = await axiosInstance.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener paquete:', error.response?.data);
            throw new Error(error.response?.data?.message || 'Error al obtener paquete');
        }
    },

    // Actualizar paquete
    update: async (id, packageData) => {
        try {
            const response = await axiosInstance.put(`/${id}`, packageData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar paquete:', error.response?.data);
            throw new Error(error.response?.data?.message || 'Error al actualizar paquete');
        }
    },

    // Eliminar paquete
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar paquete:', error.response?.data);
            throw new Error(error.response?.data?.message || 'Error al eliminar paquete');
        }
    },

    // Gestión de media
    media: {
        upload: async (formData) => {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}${API_PREFIX}/media-packages`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error('Error al subir media:', error.response?.data);
                throw new Error(error.response?.data?.message || 'Error al subir media');
            }
        },

        addToPackage: async (packageId, mediaId) => {
            try {
                const response = await axiosInstance.post(`/${packageId}/media/${mediaId}`);
                return response.data;
            } catch (error) {
                console.error('Error al añadir media:', error.response?.data);
                throw new Error(error.response?.data?.message || 'Error al añadir media');
            }
        },

        removeFromPackage: async (packageId, mediaId) => {
            try {
                await axiosInstance.delete(`/${packageId}/media/${mediaId}`);
            } catch (error) {
                console.error('Error al remover media:', error.response?.data);
                throw new Error(error.response?.data?.message || 'Error al remover media');
            }
        }
    }
};