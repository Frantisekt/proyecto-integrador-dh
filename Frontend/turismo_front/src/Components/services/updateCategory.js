const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await fetch(`http://localhost:8087/api/categories/${categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar la categoría: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en updateCategory:", error);
        return null;
    }
};

export default updateCategory;
