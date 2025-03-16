export const deleteUser = async (userId) => {
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
        const response = await fetch(`http://localhost:8087/api/v1/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            throw new Error("Error de autenticación: Token expirado o inválido.");
        }

        if (response.status === 403) {
            throw new Error("No tienes permisos para eliminar este usuario.");
        }

        if (!response.ok) {
            throw new Error("Error al eliminar el usuario.");
        }

        return { success: true };
    } catch (error) {
        console.error("Error en deleteUser:", error.message);
        return { success: false, error: error.message };
    }
};

