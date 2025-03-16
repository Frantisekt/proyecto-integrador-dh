const editCategory = async (categoryId, categoryData) => {
    const url = `http://localhost:8087/api/categories/${categoryId}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar la categoría. Código: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en editCategory:", error);
        throw error;
    }
};

export default editCategory;
