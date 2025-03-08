export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8087/api/v1/users/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el usuario");
        }

        return { success: true };
    } catch (error) {
        console.error("Error en deleteUser:", error);
        return { success: false };
    }
};
