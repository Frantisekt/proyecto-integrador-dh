/* const API_URL = "/api/v1/users";

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


 */

// Define la URL base del backend usando una variable de entorno o un valor predeterminado

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8087";

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
        const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include", // Asegúrate de incluir credenciales
        });

        if (response.status === 401) {
            throw new Error("Error de autenticación: Token expirado o inválido.");
        }

        if (!response.ok) {
            throw new Error(`Error al obtener los usuarios. Código de estado: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getUsers:", error.message);
        throw error;
    }
};