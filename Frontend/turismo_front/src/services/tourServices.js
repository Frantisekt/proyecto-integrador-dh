import axios from 'axios';

const API_URL = "http://localhost:8087/api/tourPackages";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const obtenerToursPorCategoria = async (categoryId) => {
    try {
        const response = await axiosInstance.get('/paged', {
            params: {
                page: 0,
                size: 100, // Un número grande para obtener todos los tours
                sort: 'title,asc'
            }
        });

        if (response.status === 200) {
            const tours = response.data.content;
            
            // Filtramos los tours que tienen la categoría correspondiente
            const toursFiltrados = tours.filter(tour =>
                tour.categories.some(category => category.categoryId === parseInt(categoryId))
            );

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
  