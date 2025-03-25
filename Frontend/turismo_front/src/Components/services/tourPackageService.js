import axios from 'axios';

// Se obtiene la URL base desde la variable de entorno VITE_API_URL.
// Si la URL no contiene 'http', se le antepone 'https://'.
const envUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL =
  envUrl && envUrl.startsWith('http')
    ? envUrl
    : envUrl
    ? `https://${envUrl}`
    : 'http://localhost:8087';

// Ruta base para los endpoints de tourPackages.
const TOUR_PACKAGES_BASE = `${API_BASE_URL}/api/tourPackages`;

// Instancia de axios unificada para tourPackages.
const axiosInstance = axios.create({
  baseURL: TOUR_PACKAGES_BASE,
  timeout: 50000,
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
  // Listado paginado: se utiliza el endpoint '/paged'
  getAllPackages: async (page = 0, size = 10, sort = 'title,asc') => {
    const source = axios.CancelToken.source(); // Permite cancelar la solicitud si es necesario

    try {
      console.log(`Obteniendo paquetes: página=${page}, tamaño=${size}, orden=${sort}`);
      
      const response = await axiosInstance.get('/paged', {
        timeout: 500000, // Aumenta el tiempo de espera
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
        throw new Error('Error de conexión: Verifica que el backend esté corriendo en el puerto 8087.');
      }

      if (error.response) {
        throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
      }

      throw new Error('Error al obtener paquetes: ' + error.message);
    }
  },

  // Crear nuevo paquete usando la instancia unificada
  create: async (packageData) => {
    try {
      console.log('Intentando crear paquete con datos:', packageData);
      const response = await axiosInstance.post('', packageData);
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
  
  // Actualización de paquete
  update: async (id, packageData) => {
    try {
      const response = await axiosInstance.put(`/${id}`, packageData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar paquete:', error);
      throw error;
    }
  },

  // Eliminación de paquete
  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar paquete:', error);
      throw error;
    }
  },

  // Método alternativo para eliminar, redirige al método delete
  deletePackage: async (id) => {
    if (!id) {
      console.error('ID de paquete no válido.');
      throw new Error('ID de paquete no válido');
    }
    return tourPackageService.delete(id);
  },

  // Obtener paquete por ID
  getPackageById: async (packageId) => {
    try {
      const response = await axiosInstance.get(`/${packageId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener paquete por ID:", error);
      throw new Error("Error al obtener detalles del paquete: " + error.message);
    }
  },
  
  // Actualización de paquete con procesamiento de datos
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
      const response = await axiosInstance.put(`/${id}`, requestData);

      console.log('Paquete actualizado con éxito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar paquete:', error.response?.data || error.message);
      throw new Error('Error al actualizar paquete: ' + (error.response?.data?.message || error.message));
    }
  },
  
  // Subir media: este endpoint pertenece a media-packages
  uploadMedia: async (formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/media-packages`,
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

  // Asignar media existente a un paquete
  addMediaToPackage: async (packageId, mediaPackageId) => {
    try {
      const response = await axiosInstance.post(`/${packageId}/media/${mediaPackageId}`);
      return response.data;
    } catch (error) {
      console.error('Error al añadir media al paquete:', error);
      throw new Error('Error al añadir la imagen al paquete: ' + error.message);
    }
  },
  
  // Remover media de un paquete
  removeMediaFromPackage: async (packageId, mediaPackageId) => {
    try {
      await axiosInstance.delete(`/${packageId}/media/${mediaPackageId}`);
    } catch (error) {
      console.error('Error al remover media del paquete:', error);
      throw new Error('Error al eliminar la imagen del paquete: ' + error.message);
    }
  },

  // Asignar media (similar a addMediaToPackage)
  assignMedia: async (packageId, mediaPackageId) => {
    try {
      console.log(`Asignando imagen ${mediaPackageId} al paquete ${packageId} en: ${TOUR_PACKAGES_BASE}/${packageId}/media/${mediaPackageId}`);
      const response = await axiosInstance.post(`/${packageId}/media/${mediaPackageId}`);
      console.log('Imagen asignada correctamente al paquete:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al asignar la imagen al paquete:', error);
      throw new Error(error.response?.data?.message || 'Error al asignar la imagen al paquete');
    }
  }
};
