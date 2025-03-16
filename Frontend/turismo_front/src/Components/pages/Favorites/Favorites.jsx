import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Obtener los favoritos almacenados en localStorage o desde una API
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.favoritesContainer}>
      <h1>Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes productos en favoritos.</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((product) => (
            <div key={product.id} className={styles.favoriteCard}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.buttonsContainer}>
                  <Link to={`/product/${product.id}`} className={styles.viewButton}>Ver Detalles</Link>
                  <button onClick={() => removeFromFavorites(product.id)} className={styles.removeButton}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
