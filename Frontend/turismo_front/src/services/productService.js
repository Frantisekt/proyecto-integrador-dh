import axios from 'axios';
import { favoriteService } from './favoriteService';

const API_URL = 'http://localhost:8087/api/tourPackages';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export const obtenerProductos = async (page = 0, size = 9) => {
    try {
        // Obtener los productos paginados
        const response = await axiosInstance.get('/paged', {
            params: { page, size }
        });

        const { content: products, totalPages } = response.data;

        // Si el usuario está autenticado, obtener el estado de favoritos
        let favorites = [];
        try {
            favorites = await favoriteService.getUserFavorites();
        } catch (error) {
            console.warn('No se pudieron cargar los favoritos:', error);
        }

        // Marcar los productos que son favoritos
        const productsData = products.map(product => ({
            ...product,
            isFavorite: favorites.some(fav => fav.packageId === product.packageId)
        }));

        return {
            productsData,
            totalPages
        };
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const obtenerProductoPorId = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        const product = response.data;

        // Verificar si es favorito
        let isFavorite = false;
        try {
            isFavorite = await favoriteService.checkIsFavorite(id);
        } catch (error) {
            console.warn('No se pudo verificar el estado de favorito:', error);
        }

        return {
            ...product,
            isFavorite
        };
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error;
    }
};

export const obtenerProductosDestacados = async () => {
    try {
        const response = await axiosInstance.get('/featured');
        const featuredProducts = response.data;

        // Si el usuario está autenticado, obtener el estado de favoritos
        let favorites = [];
        try {
            favorites = await favoriteService.getUserFavorites();
        } catch (error) {
            console.warn('No se pudieron cargar los favoritos:', error);
        }

        // Marcar los productos destacados que son favoritos
        return featuredProducts.map(product => ({
            ...product,
            isFavorite: favorites.some(fav => fav.packageId === product.packageId)
        }));
    } catch (error) {
        console.error('Error al obtener productos destacados:', error);
        throw error;
    }
}; 