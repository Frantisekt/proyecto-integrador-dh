const API_BASE_URL = "http://localhost:8087/api/v1/users";

export const userService = {
  getUserById: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`);
      if (!response.ok) {
        throw new Error("Error al obtener el usuario");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en getUserById:", error);
      return null;
    }
  }
};
