"use client"

import { useState, useEffect } from "react"
import { authService } from "../../services/authService"
import { userService } from "../../services/userService"
import { tourPackageService } from "../../services/tourPackageService"
import TourCard from "../../TourCard/TourCard"
import styles from "./Favorites.module.css"

const Favorites = () => {
  const [favoritePackages, setFavoritePackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = authService.getCurrentUser()
        if (!user) {
          setError("Debes iniciar sesión para ver tus favoritos.")
          setLoading(false)
          return
        }

        const userData = await userService.getUserById(user.userId)
        const favoriteIds = userData.favoritePackageIds || []

        // Obtener detalles de los paquetes favoritos
        const packagePromises = favoriteIds.map((id) => {
          return tourPackageService.getPackageById(id)
        })

        // Filtrar paquetes nulos o indefinidos
        const packages = (await Promise.all(packagePromises)).filter((pkg) => pkg && pkg.packageId)
        setFavoritePackages(packages)
      } catch (err) {
        console.error("Error al cargar favoritos:", err)
        setError("Error al cargar los favoritos")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleRemoveFavorite = (packageId) => {
    setFavoritePackages((prevFavorites) => prevFavorites.filter(pkg => pkg.packageId !== packageId));
  };

  if (loading)
    return (
      <div className={styles.favoritesContainer}>
        <p>Cargando favoritos...</p>
      </div>
    )
  if (error)
    return (
      <div className={styles.favoritesContainer}>
        <p>{error}</p>
      </div>
    )

  return (
    <div className={styles.favoritesContainer}>
      <h2>Mis Favoritos</h2>
      {favoritePackages.length === 0 ? (
        <p>No tienes paquetes en favoritos.</p>
      ) : (
        <div className={styles.tourGrid}>
          {favoritePackages.map((pkg) => {
            // Asegurarse de que la URL de la imagen sea válida
            const imageUrl =
              pkg.mediaPackages && pkg.mediaPackages.length > 0 && pkg.mediaPackages[0].mediaUrl
                ? pkg.mediaPackages[0].mediaUrl
                : "https://via.placeholder.com/300x200?text=Imagen+no+disponible"

            return (
              <TourCard
                key={pkg.packageId}
                packageId={pkg.packageId}
                title={pkg.title || "Sin título"}
                description={pkg.description || "Sin descripción"}
                imageUrl={imageUrl}
                currency={`$${pkg.price || 0}`}
                link={`/tour/${pkg.packageId}`}
                initialIsFavorite={true}
                onRemoveFavorite={handleRemoveFavorite} // Pasar la función
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Favorites
