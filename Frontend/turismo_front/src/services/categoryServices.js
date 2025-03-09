import axios from "axios";

const API_URL = "http://localhost:8087/api/categories";

export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
    return [];
  }
};
