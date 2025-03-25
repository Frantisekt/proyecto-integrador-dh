"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import getTourPackage from "../../services/getOneTourPackage"
import { favoriteService } from "../../services/favoriteService"
import { authService } from "../../services/authService"
import Swal from "sweetalert2"
import styles from "./reservation.module.css"
import flecha_atras from "../../../assets/flecha_atras.png"
import ReservationDetails from "../../reservationDetails/ReservationDetails"
import PackageFeatures from "../../packageFeatures/PackageFeatures"

const Reservation = () => {
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

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando...</p>
      </div>
    )

  if (error) return <div className={styles.errorMessage}>{error}</div>
  if (!travelPackage) return <div className={styles.errorMessage}>No se encontró el paquete</div>

  const { title, start_date, end_date, price } = travelPackage
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <img src={flecha_atras || "/placeholder.svg"} alt="Volver" className={styles.arrowIcon} />
        </Link>
        <h3 className={styles.subtitle}>Confirma y paga</h3>
      </div>

      <ReservationDetails title={title} startDate={start_date} endDate={end_date} price={price} />
    </div>
  )
}

export default Reservation
