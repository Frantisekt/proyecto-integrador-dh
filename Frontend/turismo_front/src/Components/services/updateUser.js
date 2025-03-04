export const updateUser = async (userData) => {
    try {
        const response = await fetch("http://localhost:8087/api/v1/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el usuario");
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error en updateUser:", error);
        return null;
    }
};
