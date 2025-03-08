export const obtenerToursPorCategoria = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8087/api/tourPackages`);
      if (response.ok) {
        const tours = await response.json();
  
        // Filtramos los tours que tienen la categoría correspondiente
        const toursFiltrados = tours.filter(tour =>
          tour.categories.some(category => category.categoryId === parseInt(categoryId))
        );
  
        // Imprimimos los tours filtrados en la consola
        console.log("Tours filtrados:", toursFiltrados);
  
        return toursFiltrados;
      } else {
        throw new Error("No se pudieron obtener los tours");
      }
    } catch (error) {
      console.error("Error al obtener los tours:", error);
      return [];
    }
  };
  