const API_URL = "http://localhost:8087/api/v1/users";

export const getUsers = async () => {
    const adminDataString = localStorage.getItem("adminData");

    if (!adminDataString) {
        throw new Error("No se encontró adminData. Inicia sesión nuevamente.");
    }

    const adminData = JSON.parse(adminDataString);
    const token = adminData.token; 

    if (!token) {
        throw new Error("No se encontró el token en adminData. Inicia sesión nuevamente.");
    }

    try {
        const response = await fetch("http://localhost:8087/api/v1/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            throw new Error("Error de autenticación: Token expirado o inválido.");
        }

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getUsers:", error.message);
        throw error;
    }
};


