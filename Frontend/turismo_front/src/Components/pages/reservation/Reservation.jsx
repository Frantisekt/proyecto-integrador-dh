"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate, useLocation } from "react-router-dom"
import getTourPackage from "../../services/getOneTourPackage"
import { favoriteService } from "../../services/favoriteService"
import { authService } from "../../services/authService"
import Swal from "sweetalert2"
import styles from "./reservation.module.css"
import flecha_atras from "../../../assets/flecha_atras.png"
import ReservationDetails from "../../reservationDetails/reservationDetails"
import PackageFeatures from "../../packageFeatures/PackageFeatures"
import { reservationService } from '../../services/reservationService'

const Reservation = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [travelPackage, setTravelPackage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) {
        setError("ID del paquete no encontrado")
        return
      }

      try {
        const data = await getTourPackage(id)
        console.log("Datos del paquete:", data) // Debug
        if (data) {
          setTravelPackage(data)
        } else {
          setError("No se encontró el paquete")
        }
      } catch (err) {
        console.error("Error fetching tour package:", err)
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

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando...</p>
      </div>
    )

  if (error) return <div className={styles.errorMessage}>{error}</div>
  if (!travelPackage) return <div className={styles.errorMessage}>No se encontró el paquete</div>

  if (!state) {
    return <div>Error: No se encontraron detalles de la reserva</div>
  }

  const { title, start_date, end_date, price } = travelPackage

  const imageUrl =
    travelPackage.mediaPackages && travelPackage.mediaPackages.length > 0 && travelPackage.mediaPackages[0].mediaUrl
      ? travelPackage.mediaPackages[0].mediaUrl
      : "https://via.placeholder.com/300x200?text=Imagen+no+disponible"
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <img src={flecha_atras || "/placeholder.svg"} alt="Volver" className={styles.arrowIcon} />
        </Link>
        <h3 className={styles.subtitle}>Confirma y paga</h3>
      </div>

      <ReservationDetails
        id={travelPackage.packageId}
        title={travelPackage.title}
        startDate={new Date(travelPackage.start_date)}
        endDate={new Date(travelPackage.end_date)}
        price={travelPackage.price}
        image={imageUrl}
      />
    </div>
  )
}

export default Reservation
