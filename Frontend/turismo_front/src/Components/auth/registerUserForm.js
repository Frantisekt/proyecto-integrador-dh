import axios from "axios";

const API_URL = "http://localhost:8087/api/v1/auth/register";

export const registerUser = async (userData) => {
    try {
        // Asegurarse de que todos los campos requeridos estén presentes
        const requiredFields = ['name', 'paternalSurname', 'maternalSurname', 'username', 'email', 'password', 'dni'];
        for (const field of requiredFields) {
            if (!userData[field]) {
                throw new Error(`El campo ${field} es requerido`);
            }
        }

        // Asegurarse de que el newsletter tenga un valor válido
        userData.newsletter = userData.newsletter || "NO";
        
        // Asegurarse de que role tenga un valor válido
        userData.role = userData.role || "USER";

        console.log('Intentando registrar usuario con datos:', {
            ...userData,
            password: '[REDACTED]' // No mostrar la contraseña en logs
        });

        const response = await axios.post(API_URL, userData);
        console.log('Registro exitoso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        if (error.response) {
            console.error("Detalles del error:", {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers
            });
            
            // Manejar errores específicos del servidor
            if (error.response.status === 500) {
                const errorMessage = error.response.data.message || error.response.data;
                if (errorMessage.includes("DNI ya está registrado")) {
                    throw new Error("El DNI ingresado ya está registrado en el sistema");
                } else if (errorMessage.includes("email ya está registrado")) {
                    throw new Error("El correo electrónico ya está registrado en el sistema");
                }
            }
            throw new Error(error.response.data.message || 'Error en el servidor');
        }
        throw error;
    }
};
