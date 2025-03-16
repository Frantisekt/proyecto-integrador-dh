import axios from 'axios';

const MEDIA_BASE_URL = 'http://localhost:8087/api/media-packages';
const TOUR_PACKAGE_BASE_URL = 'http://localhost:8087/api/tourPackages';

const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true 
});

// Interceptores para logs de desarrollo
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

export const mediaPackageService = {
    /**
     * Sube una imagen al backend y retorna su ID
     * @param {File} mediaFile - Archivo de imagen a subir
     * @param {string} mediaTitle - Título de la imagen
     * @param {string} mediaDescription - Descripción de la imagen
     * @returns {Promise<Object>} - Datos del media package creado
     */
    upload: async (mediaFile, mediaTitle, mediaDescription) => {
        try {
            const formData = new FormData();
            formData.append('file', mediaFile);
            formData.append('mediaTitle', mediaTitle);
            formData.append('mediaDescription', mediaDescription);
    
            console.log('Subiendo imagen a:', MEDIA_BASE_URL);
            console.log('FormData:', [...formData]); 

            const response = await axios.post(MEDIA_BASE_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            console.log('Imagen subida con éxito:', response.data);
            return response.data; 
        } catch (error) {
            console.error('Error al subir imagen:', error);
            throw new Error(error.response?.data?.message || 'Error al subir la imagen');
        }
    },
};

