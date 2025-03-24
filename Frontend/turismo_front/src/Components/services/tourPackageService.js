import axios from 'axios';
import { API_BASE_URL, ENDPOINTS, getAuthHeader } from './apiconfig';

// Crear una instancia de axios con la URL base
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Importante para CORS con credenciales
});

// Interceptor para incluir el token de autenticación en cada solicitud
axiosInstance.interceptors.request.use((config) => {
    const authHeader = getAuthHeader();
    if (authHeader.Authorization) {
        config.headers.Authorization = authHeader.Authorization;
    }
    return config;
});

// Interceptor para logs de desarrollo
axiosInstance.interceptors.request.use((request) => {
    console.log('Starting Request:', request);
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.log('Error Response:', error.response);
        return Promise.reject(error);
    }
);

export const tourPackageService = {
    getAllPackages: async (page = 0, size = 10, sort = 'title,asc') => {
        const source = axios.CancelToken.source(); // Permite cancelar la solicitud si es necesario

        try {
            console.log(`Obteniendo paquetes: página=${page}, tamaño=${size}, orden=${sort}`);

            const response = await axiosInstance.get(ENDPOINTS.TOUR_PACKAGES + '/paged', {
                timeout: 500000, // Aumenta el tiempo de espera a 20 segundos
                cancelToken: source.token,
                params: { page, size, sort },
            });

            console.log('Paquetes obtenidos correctamente:', response.data);
            return response.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.warn('Solicitud cancelada:', error.message);
                return;
            }

            console.error('Error al obtener paquetes:', error);

            if (error.code === 'ECONNABORTED') {
                throw new Error('Tiempo de espera excedido: La solicitud tardó demasiado en responder. Intenta nuevamente.');
            }

            if (error.code === 'ERR_NETWORK') {
                throw new Error('Error de conexión: Verifica que el backend está corriendo.');
            }

            if (error.response) {
                throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
            }

            throw new Error('Error al obtener paquetes: ' + error.message);
        }
    },

    create: async (packageData) => {
        try {
            console.log('Intentando crear paquete con datos:', packageData);
            const response = await axiosInstance.post(ENDPOINTS.TOUR_PACKAGES, packageData);
            console.log('Paquete creado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error detallado al crear paquete:', {
                message: error.message,
                code: error.code,
                response: error.response,
                config: error.config,
            });

            if (error.code === 'ERR_NETWORK') {
                throw new Error('Error de conexión: Verifica que el servidor backend esté corriendo.');
            }

            if (error.response) {
                throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
            }

            throw new Error('Error al crear paquete: ' + error.message);
        }
    },

    updatePackage: async (id, packageData) => {
        try {
            const requestData = {
                title: packageData.title,
                description: packageData.description,
                state: packageData.state,
                start_date: packageData.start_date,
                end_date: packageData.end_date,
                price: packageData.price,
                mediaPackageIds: packageData.mediaPackageIds || [],
                featureIds: packageData.featureIds || [],
            };

            console.log('Enviando actualización con:', requestData);
            const response = await axiosInstance.put(`${ENDPOINTS.TOUR_PACKAGES}/${id}`, requestData);

            console.log('Paquete actualizado con éxito:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar paquete:', error.response?.data || error.message);
            throw new Error('Error al actualizar paquete: ' + (error.response?.data?.message || error.message));
        }
    },

    deletePackage: async (id) => {
        if (!id) {
            console.error('ID de paquete no válido.');
            throw new Error('ID de paquete no válido');
        }

        try {
            console.log(`Eliminando paquete con ID: ${id}`);
            const response = await axiosInstance.delete(`${ENDPOINTS.TOUR_PACKAGES}/${id}`);
            console.log('Paquete eliminado correctamente.');
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el paquete:', error);
            if (error.response?.status === 404) {
                throw new Error('Paquete no encontrado');
            }
            if (error.code === 'ERR_NETWORK') {
                throw new Error('No se pudo conectar con el servidor');
            }
            throw new Error(error.response?.data?.message || 'Error al eliminar el paquete');
        }
    },

    getPackageById: async (packageId) => {
        try {
            const response = await axiosInstance.get(`${ENDPOINTS.TOUR_PACKAGES}/${packageId}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener paquete por ID:", error);
            throw new Error("Error al obtener detalles del paquete: " + error.message);
        }
    },

    uploadMedia: async (formData) => {
        try {
            const response = await axiosInstance.post(ENDPOINTS.MEDIA_PACKAGES, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al subir media:', error);
            throw new Error('Error al subir la imagen: ' + error.message);
        }
    },

    addMediaToPackage: async (packageId, mediaPackageId) => {
        try {
            const response = await axiosInstance.post(`${ENDPOINTS.TOUR_PACKAGES}/${packageId}/media/${mediaPackageId}`);
            return response.data;
        } catch (error) {
            console.error('Error al añadir media al paquete:', error);
            throw new Error('Error al añadir la imagen al paquete: ' + error.message);
        }
    },

    removeMediaFromPackage: async (packageId, mediaPackageId) => {
        try {
            await axiosInstance.delete(`${ENDPOINTS.TOUR_PACKAGES}/${packageId}/media/${mediaPackageId}`);
        } catch (error) {
            console.error('Error al remover media del paquete:', error);
            throw new Error('Error al eliminar la imagen del paquete: ' + error.message);
        }
    },

    assignMedia: async (packageId, mediaPackageId) => {
        try {
            const url = `${ENDPOINTS.TOUR_PACKAGES}/${packageId}/media/${mediaPackageId}`;
            console.log(`Asignando imagen ${mediaPackageId} al paquete ${packageId} en: ${url}`);
            const response = await axiosInstance.post(url);
            console.log('Imagen asignada correctamente al paquete:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al asignar la imagen al paquete:', error);
            throw new Error(error.response?.data?.message || 'Error al asignar la imagen al paquete');
        }
    },
};