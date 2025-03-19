import axios from "axios";

const API_URL = "/api/categories";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  withCredentials: true // Importante para CORS con credenciales
});

export const categoryServices = {
  obtenerCategorias: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo categorías:", error);
      return [];
    }
  },
  assignMedia: async (categoryId, mediaCategoryId) => {
    try {
        const url = `${API_URL}/${categoryId}/media/${mediaCategoryId}`;
        const data = {
            mediaCategoryId: mediaCategoryId
        };
   
        console.log(`Asignando imagen ${mediaCategoryId} al paquete ${categoryId} en: ${url}`);
        const response = await axiosInstance.post(url, data);
        console.log('Imagen asignada correctamente al paquete.');
    } catch (error) {
        console.error('Error al asignar la imagen al paquete:', error);
        throw new Error(error.response?.data?.message || 'Error al asignar la imagen al paquete');
    }
  }
}


 