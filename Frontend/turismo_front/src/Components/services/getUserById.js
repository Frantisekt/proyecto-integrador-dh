const API_URL = "http://localhost:8087/api/v1/users";

const getUserById = {
    getUserById: async (userId) => {
        try {
            const adminData = localStorage.getItem('adminData');
            if (!adminData) {
                throw new Error("No hay datos de administrador");
            }

            const { token } = JSON.parse(adminData);
            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await fetch(`${API_URL}/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || `Error al obtener el usuario con ID ${userId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en getUserById:", error);
            throw error;
        }
    }
};

export default getUserById;
