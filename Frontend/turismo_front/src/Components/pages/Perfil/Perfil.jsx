import React, { useState, useEffect } from "react";
import styles from "./Perfil.module.css";
import getUserProfile from "../../services/getUserProfile"; // Importar la función para obtener el perfil

const Perfil = () => {
  const [usuario, setUsuario] = useState(null); // Estado para guardar los datos del usuario
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile.getUserProfile(); // Obtener los datos del perfil
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes reemplazarlo con un spinner si lo prefieres
  }

  if (!usuario) {
    return <div>No se pudo cargar el perfil.</div>; // Si no se obtuvo el perfil
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.tarjeta}>
        <h2 className={styles.titulo}>Perfil de Usuario</h2>

        <div className={styles.contenido}>
          <div className={styles.info}>
            <span>Nombre</span> {usuario.nombre}
          </div>
          <div className={styles.info}>
            <span>Apellido Paterno</span> {usuario.apellidoPaterno}
          </div>
          <div className={styles.info}>
            <span>Apellido Materno</span> {usuario.apellidoMaterno}
          </div>
          <div className={styles.info}>
            <span>Correo Electrónico</span> {usuario.correo}
          </div>
          <div className={styles.info}>
            <span>DNI</span> {usuario.dni}
          </div>
          <div className={styles.info}>
            <span>Nombre de Usuario</span> {usuario.nombreUsuario}
          </div>
        </div>

        <div className={styles.contrasena}>
          <span>Contraseña</span> {usuario.contrasena}
          <button className={styles.botonSecundario}>Cambiar</button>
        </div>

        <div className={styles.botones}>
          <button className={styles.botonSecundario}>Editar</button>
          <button className={styles.botonPrimario}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
