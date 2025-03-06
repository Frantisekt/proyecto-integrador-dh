import axios from "axios";

const API_URL = "http://localhost:8087/api/v1/users";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario", error);
        throw error;
    }
};
