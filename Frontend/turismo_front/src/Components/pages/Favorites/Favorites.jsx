import { useState, useEffect } from "react";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";
import { tourPackageService } from "../../services/tourPackageService";
import TourCard from "../../TourCard/TourCard";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const [favoritePackages, setFavoritePackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = authService.getCurrentUser();
        if (!user) {
          setError("Debes iniciar sesión para ver tus favoritos.");
          setLoading(false);
          return;
        }

        const userData = await userService.getUserById(user.userId);
        const favoriteIds = userData.favoritePackageIds || [];
        console.log(favoriteIds);

        // Obtener detalles de los paquetes favoritos
        const packagePromises = favoriteIds.map((id) => {
          console.log(`Obteniendo paquete con ID: ${id}`);
          return tourPackageService.getPackageById(id);
        });

        const packages = await Promise.all(packagePromises);
        console.log("paquetes", packages);

        setFavoritePackages(packages);
      } catch (err) {
        setError("Error al cargar los favoritos");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Cargando favoritos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.favoritesContainer}>
      <h2>Mis Favoritos</h2>
      {favoritePackages.length === 0 ? (
        <p>No tienes paquetes en favoritos.</p>
      ) : (
        <div className={styles.tourGrid}>
          {favoritePackages.map((pkg) => {
            console.log("pkg", pkg);
            const imageUrl =
  (pkg.mediaPackages && pkg.mediaPackages.length > 0 && pkg.mediaPackages[0].mediaUrl)
    ? pkg.mediaPackages[0].mediaUrl  
    : "https://www.example.com/default-image.jpg";  


            return (
              <TourCard
                key={pkg.packageId}
                packageId={pkg.packageId}
                title={pkg.title}
                description={pkg.description}
                imageUrl={imageUrl}
                currency={`$${pkg.price}`}
                link={`/tour/${pkg.packageId}`}
                initialIsFavorite={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
