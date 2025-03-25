import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8087";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // Importante para CORS con credenciales
});

// Interceptor para logs de desarrollo
axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
});

axiosInstance.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.log('Error Response:', error.response);
        return Promise.reject(error);
    }
);

export const tourPackageService = {
    getAllPackages: async (page = 0, size = 10, sort = 'title,asc') => {
        const source = axios.CancelToken.source(); // Permite cancelar la solicitud si es necesario

        try {
            console.log(`Obteniendo paquetes: página=${page}, tamaño=${size}, orden=${sort}`);
            
            const response = await axiosInstance.get('', {
                timeout: 500000, // Aumenta el tiempo de espera a 20 segundos
                cancelToken: source.token,
                params: { page, size, sort }
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
                throw new Error('Error de conexión: Verifica que el backend está corriendo en el puerto 8087.');
            }

            if (error.response) {
                throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
            }

            throw new Error('Error al obtener paquetes: ' + error.message);
        }
    },
    create: async (packageData) => {
        const API_URL = 'http://localhost:8087/api/tourPackages';
        
        try {
            console.log('Intentando crear paquete con datos:', packageData);
            const response = await axios.post(API_URL, packageData);
            console.log('Paquete creado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error detallado al crear paquete:', {
                message: error.message,
                code: error.code,
                response: error.response,
                config: error.config
            });
    
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Error de conexión: Verifica que el servidor backend esté corriendo en el puerto 8087');
            }
    
            if (error.response) {
                throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
            }
    
            throw new Error('Error al crear paquete: ' + error.message);
        }
    },
    

    update: async (id, packageData) => {
        try {
            const response = await axiosInstance.put(`/${id}`, packageData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar paquete:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar paquete:', error);
            throw error;
        }
    },

    deletePackage: async (id) => {
        if (!id) {
            console.error('ID de paquete no válido.');
            throw new Error('ID de paquete no válido');
        }
    
        try {
            const url = `http://localhost:8087/api/tourPackages/${id}`;
            console.log(`Eliminando paquete con ID: ${id} en: ${url}`);
    
            const response = await axios.delete(url); // ✅ CORRECTO: axios.delete()
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
            const response = await axios.get(`http://localhost:8087/api/tourPackages/${packageId}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener paquete por ID:", error);
            throw new Error("Error al obtener detalles del paquete: " + error.message);
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
                featureIds: packageData.featureIds || []
            };
    
            console.log('Enviando actualización con:', requestData);
            const response = await axiosInstance.put(`http://localhost:8087/api/tourPackages/${id}`, requestData);
    
            console.log('Paquete actualizado con éxito:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar paquete:', error.response?.data || error.message);
            throw new Error('Error al actualizar paquete: ' + (error.response?.data?.message || error.message));
        }
    },
    
    

    uploadMedia: async (formData) => {
        try {
            const response = await axios.post(
                'http://localhost:8087/api/media-packages',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al subir media:', error);
            throw new Error('Error al subir la imagen: ' + error.message);
        }
    },

    addMediaToPackage: async (packageId, mediaPackageId) => {
        try {
            const url = `http://localhost:8087/api/tourPackages/${packageId}/media/${mediaPackageId}`;
            const response = await axios.post(url);
            return response.data;
        } catch (error) {
            console.error('Error al añadir media al paquete:', error);
            throw new Error('Error al añadir la imagen al paquete: ' + error.message);
        }
    },
    

    removeMediaFromPackage: async (packageId, mediaPackageId) => {
        try {
            await axiosInstance.delete(`/${packageId}/media/${mediaPackageId}`);
        } catch (error) {
            console.error('Error al remover media del paquete:', error);
            throw new Error('Error al eliminar la imagen del paquete: ' + error.message);
        }
    },

    assignMedia: async (packageId, mediaPackageId) => {
        try {
            const url = `http://localhost:8087/api/tourPackages/${packageId}/media/${mediaPackageId}`;
            
            console.log(`Asignando imagen ${mediaPackageId} al paquete ${packageId} en: ${url}`);
            
            const response = await axiosInstance.post(url);
            console.log('Imagen asignada correctamente al paquete:', response.data);
            
            return response.data;
        } catch (error) {
            console.error('Error al asignar la imagen al paquete:', error);
            throw new Error(error.response?.data?.message || 'Error al asignar la imagen al paquete');
        }
    }
    
   
}; 
