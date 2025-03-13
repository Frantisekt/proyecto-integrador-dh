import axios from 'axios';

const API_URL = 'http://localhost:8087/api/tourPackages/paged';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, 
});


axiosInstance.interceptors.request.use(request => {
    console.log('Iniciando solicitud:', request);
    return request;
});

axiosInstance.interceptors.response.use(
    response => {
        console.log('Respuesta recibida:', response);
        return response;
    },
    error => {
        console.error('Error en la respuesta:', error.response);
        return Promise.reject(error);
    }
);


export const obtenerProductos = async (page = 0, size = 8, sort = 'title,asc') => {
    const source = axios.CancelToken.source();

    try {
        console.log(`Obteniendo productos: página=${page}, tamaño=${size}, orden=${sort}`);
        
        const response = await axiosInstance.get('', {
            cancelToken: source.token,
            params: { page, size, sort },
        });

        
        if (response.data && response.data.content) {
            console.log('Productos obtenidos:', response.data);
            return {
                productsData: response.data.content,  
                totalPages: response.data.totalPages, 
                currentPage: response.data.number,    
            };
        } else {
            throw new Error('No se encontraron productos.');
        }
    } catch (error) {
        if (axios.isCancel(error)) {
            console.warn('Solicitud cancelada:', error.message);
        } else {
            console.error('Error al obtener productos:', error);
        }

        return { productsData: [], totalPages: 0 };
    }
};
