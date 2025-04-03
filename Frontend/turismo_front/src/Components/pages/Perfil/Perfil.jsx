import { useEffect, useState } from "react";
import styles from "./Perfil.module.css";
import getUserProfile from "../../services/getUserProfile";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile();
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    fetchData();
  }, []);

  if (!usuario) {
    return <p className={styles.loading}>Cargando...</p>;
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.tarjeta}>
        <h2 className={styles.titulo}>Perfil de Usuario</h2>

        <div className={styles.fila}>
          <div className={styles.etiqueta}>Nombre</div>
          <div className={styles.valor}>{usuario.name}</div>
        </div>

        <div className={styles.fila}>
          <div className={styles.etiqueta}>Apellido Paterno</div>
          <div className={styles.valor}>{usuario.paternalSurname}</div>
        </div>

        <div className={styles.fila}>
          <div className={styles.etiqueta}>Apellido Materno</div>
          <div className={styles.valor}>{usuario.maternalSurname}</div>
        </div>

        <div className={styles.fila}>
          <div className={styles.etiqueta}>Correo Electrónico</div>
          <div className={styles.valor}>{usuario.email}</div>
        </div>

        <div className={styles.fila}>
          <div className={styles.etiqueta}>DNI</div>
          <div className={styles.valor}>{usuario.dni}</div>
        </div>

        <div className={styles.fila}>
          <div className={styles.etiqueta}>Nombre de Usuario</div>
          <div className={styles.valor}>{usuario.username}</div>
        </div>

        {/* Contraseña sin botón de mostrar */}
        <div className={styles.fila}>
          <div className={styles.etiqueta}>Contraseña</div>
          <div className={styles.valor}>•••••••</div>
        </div>

      </div>
    </div>
  );
};

export default Perfil;