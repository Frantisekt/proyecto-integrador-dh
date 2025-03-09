const API_URL = "http://localhost:8087/api/v1/users";

const getUserById = {
    getUserById: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/${userId}`);

            if (!response.ok) {
                throw new Error(`Error al obtener el usuario con ID ${userId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en getUserById:", error);
            throw error;
        }
    }
};

export default getUserById;
