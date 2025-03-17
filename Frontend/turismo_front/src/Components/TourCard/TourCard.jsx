"use client"

import { useState, useEffect } from "react"
import styles from "./TourCard.module.css"
import { favoriteService } from "../../services/favoriteService"
import { useNavigate } from "react-router-dom"
import { authService } from "../../services/authService"
import Swal from "sweetalert2"

const TourCard = ({ 
  title, 
  description, 
  imageUrl, 
  currency, 
  link, 
  type, 
  packageId, 
  initialIsFavorite = false,
  onRemoveFavorite 
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (packageId && authService.isAuthenticated()) {
        const isFav = await favoriteService.checkIsFavorite(packageId)
        setIsFavorite(isFav)
      }
    }
    checkFavoriteStatus()
  }, [packageId])

  const handleFavoriteClick = async (e) => {
    e.preventDefault() 

    if (!authService.isAuthenticated()) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Necesitas iniciar sesión para guardar favoritos",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Ir a iniciar sesión",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth")
        }
      })
      return
    }

    if (isLoading) return

    setIsLoading(true)
    try {
      if (isFavorite) {
        await favoriteService.removeFromFavorites(packageId)
        setIsFavorite(false)
        onRemoveFavorite?.(packageId) 

        
        Swal.fire({
          title: "Eliminado de favoritos",
          text: "Este paquete ha sido eliminado de tus favoritos.",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        await favoriteService.addToFavorites(packageId)
        setIsFavorite(true)

        
        Swal.fire({
          title: "¡Añadido a favoritos!",
          text: "Este paquete se ha guardado en tus favoritos.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error)
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el favorito. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Ok"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.card}>
      {type === "featured" && <span className={styles.badge}>Destacado</span>}

      <button
        className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ""} ${isLoading ? styles.loading : ""}`}
        onClick={handleFavoriteClick}
        disabled={isLoading}
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.heartIcon}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      <div className={styles.imageContainer}>
        <img src={imageUrl || "https://via.placeholder.com/150"} alt={title} className={styles.cardImage} />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>

        {currency && <div className={styles.cardPrice}>{currency}</div>}

        <a href={link} className={styles.cardLink}>
          Ver detalles
        </a>
      </div>
    </div>
  )
}

export default TourCard
