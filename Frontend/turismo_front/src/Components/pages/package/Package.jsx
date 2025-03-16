"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import getTourPackage from "../../services/getOneTourPackage"
import styles from "./package.module.css"
import Gallery from "../../gallery/Gallery"
import flecha_atras from "../../../assets/flecha_atras.png"
import PackageDetails from "../../packageDetails/PackageDetails"
import PackageFeatures from "../../packageFeatures/PackageFeatures"

const Package = () => {
  const { id } = useParams()
  const [travelPackage, setTravelPackage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      </div>

      {images.length > 0 && (
          <Gallery images={images} className={styles.gallery} />
      )}

      <PackageDetails description={description} startDate={start_date} endDate={end_date} price={price} />

      <div className={styles.featuresWrapper}>
        <PackageFeatures features={formattedFeatures} />
      </div>
    </div>
  )
}

export default Package

