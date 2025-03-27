import axios from 'axios';

const API_URL = 'http://localhost:8087/api/features';

export const featureService = {
    getAll: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las características:', error);
            throw error;
        }
    }
};