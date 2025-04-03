const API_BASE_URL = "/api/v1/users";

const getUserProfile = async () => {
    try {
        // Intentamos obtener los datos de login del localStorage
        const loginResponse = localStorage.getItem('loginResponse');
        let token, userId;
        
        if (loginResponse) {
            // Si tenemos la respuesta del login
            const parsedResponse = JSON.parse(loginResponse);
            token = parsedResponse.token;
            userId = parsedResponse.userId;
        } else {
            // Si no, intentamos usar la información que vimos en la consola
            const adminData = localStorage.getItem('adminData');
            
            if (adminData) {
                const parsedData = JSON.parse(adminData);
                token = parsedData.token;
                userId = parsedData.userId || parsedData.adminId;
            }
        }
        
        // Verificar que tengamos los datos necesarios
        if (!token || !userId) {
            // Buscar directamente en localStorage para cualquier dato que contenga un token
            const allStorageKeys = Object.keys(localStorage);
            let foundData = null;
            
            for (const key of allStorageKeys) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.token) {
                        token = data.token;
                        userId = data.userId;
                        foundData = data;
                        break;
                    }
                } catch (e) {
                    // Ignorar items que no son JSON válido
                    continue;
                }
            }
            
            // Si aún no encontramos datos, lanzar error
            if (!foundData) {
                throw new Error("No se encontró información de autenticación");
            }
        }
        
        // Realizar la petición directamente aquí, sin llamar a getUserById
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || `Error al obtener el usuario con ID ${userId}`);
        }
        
        const userData = await response.json();
        console.log('Perfil de usuario obtenido:', userData);
        return userData;
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
        throw error;
    }
};

export default getUserProfile;