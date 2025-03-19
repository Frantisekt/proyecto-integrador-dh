import axios from "axios";

const API_URL = "/api/v1/users";

export const registerUser = async (userData) => {
    try {
        const adminData = localStorage.getItem('adminData');
        if (!adminData) {
            throw new Error("No hay datos de administrador");
        }

        const { token } = JSON.parse(adminData);
        if (!token) {
            throw new Error("No hay token de autenticación");
        }

        // Asegurarse de que el rol esté en el formato correcto
        const formattedUserData = {
            ...userData,
            role: userData.role || 'USER' // El rol ya debe venir en mayúsculas del formulario
        };

        console.log('Datos a enviar:', formattedUserData); // Debug log

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.post(API_URL, formattedUserData, config);
        console.log('Respuesta del servidor:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario", error);
        if (error.response) {
            console.error("Detalles del error:", {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers
            });
        }
        throw error;
    }
};
