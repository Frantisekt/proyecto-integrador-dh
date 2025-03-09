const API_URL = "http://localhost:8087/api/v1/users";

export const getUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error al obtener usuarios");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getUsers:", error);
        return [];
    }
};
