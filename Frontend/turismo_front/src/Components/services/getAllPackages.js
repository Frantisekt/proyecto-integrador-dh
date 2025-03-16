import axios from "axios";

const API_URL = "http://localhost:8087/api/tourPackages/paged?page=0&size=50&sort=title,asc";

const getAllPackages = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo los paquetes turísticos:", error);
        throw error;
    }
};

export default getAllPackages;
