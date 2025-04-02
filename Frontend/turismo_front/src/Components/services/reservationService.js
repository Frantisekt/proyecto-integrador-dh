import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = '/api/reservations';

export const reservationService = {
    createReservation: async (reservationData) => {
        try {
            const headers = authService.getAuthHeader();
            
            // Asegurarnos de que los datos están en el formato correcto
            const formattedData = {
                ...reservationData,
                numberOfAdults: Number(reservationData.numberOfAdults),
                numberOfChildren: Number(reservationData.numberOfChildren),
                numberOfInfants: Number(reservationData.numberOfInfants)
            };

            console.log('Datos formateados antes de enviar:', formattedData);

            const response = await axios.post(API_BASE_URL, formattedData, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error en createReservation:', error.response?.data || error);
            throw error;
        }
    },

    getUserReservations: async (userId) => {
        try {
            const headers = authService.getAuthHeader();
            const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user reservations:', error);
            throw error;
        }
    },

    updateReservation: async (id, reservationData) => {
        try {
            const headers = authService.getAuthHeader();
            
            // Solo enviamos los campos necesarios para la actualización
            const updateData = {
                userId: reservationData.userId,
                packageId: reservationData.packageId,
                numberOfAdults: Number(reservationData.numberOfAdults),
                numberOfChildren: Number(reservationData.numberOfChildren),
                numberOfInfants: Number(reservationData.numberOfInfants),
                confirmationStatus: reservationData.confirmationStatus || "PENDING"
            };

            console.log('Datos a enviar en updateReservation:', updateData);

            const response = await axios.put(`${API_BASE_URL}/${id}`, updateData, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Respuesta de actualización:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error completo en updateReservation:', error.response || error);
            throw error;
        }
    },

    deleteReservation: async (id) => {
        try {
            const headers = authService.getAuthHeader();
            const response = await axios.delete(`${API_BASE_URL}/${id}`, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting reservation:', error);
            throw error;
        }
    },

    // Método adicional para actualizar solo el estado de la reserva
    updateStatus: async (id, status) => {
        try {
            const headers = authService.getAuthHeader();
            const response = await axios.put(`${API_BASE_URL}/${id}/status`, { status }, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating reservation status:', error);
            throw error;
        }
    }
}; 