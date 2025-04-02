"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import getTourPackage from "../../services/getOneTourPackage"
import { favoriteService } from "../../services/favoriteService"
import { authService } from "../../services/authService"
import Swal from "sweetalert2"
import styles from "./package.module.css"
import Gallery from "../../gallery/Gallery"
import flecha_atras from "../../../assets/flecha_atras.png"
import PackageDetails from "../../packageDetails/PackageDetails"
import PackageFeatures from "../../packageFeatures/PackageFeatures"
import { FaHeart, FaRegHeart } from "react-icons/fa"

const Package = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [travelPackage, setTravelPackage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await getTourPackage(id)
        setTravelPackage(data)
      } catch (err) {
        setError("Error al cargar el paquete")
      } finally {
        setLoading(false)
      }
    }
    fetchPackage()
  }, [id])

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (authService.isAuthenticated()) {
        const isFav = await favoriteService.checkIsFavorite(id)
        setIsFavorite(isFav)
      }
    }
    checkFavoriteStatus()
  }, [id])

  const toggleFavorite = async () => {
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
          navigate("/auth");
        }
      });
      return;
    }
  
    if (isLoadingFavorite) return;
  
    setIsLoadingFavorite(true);
  
    try {
      console.log("Usuario autenticado:", authService.getCurrentUser()); // Debug usuario
  
      if (isFavorite) {
        console.log(`Intentando eliminar paquete ${id} de favoritos`);
        const response = await favoriteService.removeFromFavorites(id);
        console.log("Respuesta de API (eliminar favorito):", response);
        setIsFavorite(false);
        Swal.fire({
          title: "Eliminado de favoritos",
          text: "Este paquete ha sido eliminado de tus favoritos.",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        console.log(`Intentando añadir paquete ${id} a favoritos`);
        const response = await favoriteService.addToFavorites(id);
        console.log("Respuesta de API (añadir favorito):", response);
        setIsFavorite(true);
        Swal.fire({
          title: "¡Añadido a favoritos!",
          text: "Este paquete se ha guardado en tus favoritos.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el favorito. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Ok"
      });
    } finally {
      setIsLoadingFavorite(false);
    }
  };
  

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando...</p>
      </div>
    )

  if (error) return <div className={styles.errorMessage}>{error}</div>
  if (!travelPackage) return <div className={styles.errorMessage}>No se encontró el paquete</div>

  const { title, description, start_date, end_date, price, mediaPackages = [], features = [] } = travelPackage
  const images = mediaPackages.map((media) => media.mediaUrl)
  const formattedFeatures = features.map((feature) => ({ name: feature, displayName: feature.replace(/_/g, " ") }))

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <img src={flecha_atras || "/placeholder.svg"} alt="Volver" className={styles.arrowIcon} />
        </Link>
        <h3 className={styles.subtitle}>Detalles</h3>
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>

        {/* Botón de favoritos */}
        <button
          onClick={toggleFavorite}
          className={`${styles.favoriteButtonLarge} ${isFavorite ? styles.isFavorite : ""} ${isLoadingFavorite ? styles.loading : ""}`}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          disabled={isLoadingFavorite}
        >
          {isFavorite ? (
            <>
              <FaHeart className={styles.heartIcon} />
              <span>Guardado</span>
            </>
          ) : (
            <>
              <FaRegHeart className={styles.heartIcon} />
              <span>Añadir a favoritos</span>
            </>
          )}
        </button>
      </div>

      {images.length > 0 && <Gallery images={images} className={styles.gallery} />}

      {travelPackage && (
        <PackageDetails
          id={travelPackage.packageId}
          description={travelPackage.description}
          startDate={travelPackage.start_date}
          endDate={travelPackage.end_date}
          price={travelPackage.price}
        />
      )}

      <div className={styles.featuresWrapper}>
        <PackageFeatures features={formattedFeatures} />
      </div>
    </div>
  )
}

export default Package
