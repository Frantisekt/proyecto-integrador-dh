import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../config/api.config';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export const priceRangeService = {
    getAll: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.PRICE_RANGES);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los rangos de precios:', error);
            throw error;
        }
    }
};