import axios from 'axios';

const API_URL = '/api/features';

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