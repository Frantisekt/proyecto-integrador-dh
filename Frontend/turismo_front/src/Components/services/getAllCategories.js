const getAllCategories = async () => {
    try {
        const response = await fetch("http://localhost:8087/api/categories");
        if (!response.ok) {
            throw new Error(`Error al obtener las categorías: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getAllCategories:", error);
        throw error;
    }
};

export default getAllCategories;
