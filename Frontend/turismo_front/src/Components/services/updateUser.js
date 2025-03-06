export const updateUser = async (userData) => {
    try {
        console.log('Datos originales:', userData); // Debug log

        // Preparar el DTO según la estructura exacta esperada por el backend
        const userRequestDTO = {
            name: userData.name,
            paternalSurname: userData.paternalSurname,
            maternalSurname: userData.maternalSurname,
            username: userData.username,
            email: userData.email,
            password: userData.password || "", // Si no se va a actualizar la contraseña, enviar vacío
            dni: userData.dni,
            newsletter: userData.newsletter,
            role: userData.role.toUpperCase() // Asegurarnos que el rol esté en mayúsculas
        };

        console.log('UserRequestDTO a enviar:', userRequestDTO); // Debug log

        // Verificar que el rol sea válido antes de enviar
        if (!['ADMIN', 'AGENT', 'USER'].includes(userRequestDTO.role)) {
            throw new Error(`Rol inválido: ${userRequestDTO.role}`);
        }

        // Log de la petición completa
        console.log('Enviando petición PUT a:', `http://localhost:8087/api/v1/users/${userData.userId}`);
        console.log('Headers:', {
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        console.log('Body:', JSON.stringify(userRequestDTO, null, 2));

        const response = await fetch(`http://localhost:8087/api/v1/users/${userData.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(userRequestDTO)
        });

        // Log de la respuesta completa
        console.log('Respuesta del servidor:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Error response:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Datos de respuesta:', responseData); // Debug log

        // Verificaciones detalladas de la respuesta
        if (!responseData) {
            throw new Error('La respuesta está vacía');
        }

        if (!responseData.userId) {
            throw new Error('La respuesta no contiene userId');
        }

        if (!responseData.role) {
            throw new Error('La respuesta no contiene role');
        }

        // Comparación detallada de roles
        if (responseData.role !== userRequestDTO.role) {
            const errorDetails = {
                mensaje: 'El rol no se actualizó correctamente',
                rolEnviado: userRequestDTO.role,
                rolRecibido: responseData.role,
                datosEnviados: userRequestDTO,
                datosRecibidos: responseData
            };
            console.error('Error en actualización de rol:', errorDetails);
            throw new Error(JSON.stringify(errorDetails, null, 2));
        }

        return responseData;
    } catch (error) {
        console.error("Error detallado en updateUser:", error);
        // Mostrar un mensaje más amigable al usuario
        Swal.fire({
            title: 'Error al actualizar',
            text: 'No se pudo actualizar el rol del usuario. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        throw error;
    }
};
