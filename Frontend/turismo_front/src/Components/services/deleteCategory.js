const deleteCategory = async (categoryId) => {
    try {
        const response = await fetch(`http://localhost:8087/api/categories/${categoryId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar la categoría: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Error en deleteCategory:", error);
        return { success: false };
    }
};

export default deleteCategory;
