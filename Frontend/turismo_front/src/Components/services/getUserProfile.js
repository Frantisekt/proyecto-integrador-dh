const API_URL = "http://localhost:8087/api/v1/users/me"; // Endpoint para obtener el perfil del usuario actual

const getUserProfile = {
    getUserProfile: async () => {
        try {
            const userData = localStorage.getItem('userData'); // Aquí obtenemos los datos del usuario logueado
            if (!userData) {
                throw new Error("No hay datos del usuario");
            }

            const { token } = JSON.parse(userData); // Asegúrate de almacenar el token correctamente en localStorage
            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "Error al obtener el perfil del usuario");
            }

            return await response.json(); // Devuelve los datos del perfil del usuario
        } catch (error) {
            console.error("Error en getUserProfile:", error);
            throw error; // Re-lanzamos el error para que lo puedas manejar en el componente
        }
    }
};

export default getUserProfile;
