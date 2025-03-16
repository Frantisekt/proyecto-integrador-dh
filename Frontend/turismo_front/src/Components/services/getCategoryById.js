const getCategoryById = async (categoryId) => {
    const url = `http://localhost:8087/api/categories/${categoryId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener la categoría. Código: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getCategoryById:", error);
        throw error;
    }
};

export default getCategoryById;
