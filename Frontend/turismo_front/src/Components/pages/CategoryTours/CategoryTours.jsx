"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { obtenerToursPorCategoria } from "../../../services/tourServices"
import TourCard from "../../TourCard/TourCard"
import styles from "./CategoryTours.module.css"

const CategoryTours = () => {
  const { categoryId } = useParams()
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    const cargarTours = async () => {
      setLoading(true)
      try {
        const toursData = await obtenerToursPorCategoria(categoryId)
        setTours(toursData)

    
        if (toursData.length > 0 && toursData[0].category) {
          setCategoryName(toursData[0].category.title || "")
        }
      } catch (error) {
        console.error("Error al cargar tours:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarTours()
  }, [categoryId])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        Cargando tours...
      </div>
    )
  }

  if (tours.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Tours</h2>
        </div>
        <div className={styles.noTours}>
          <div className={styles.noToursIcon}>🏝️</div>
          <p className={styles.noToursText}>No se encontraron tours en esta categoría.</p>
          <Link to="/categories" className={styles.backButton}>
            Volver a categorías
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{categoryName ? `Tours en ${categoryName}` : "Tours en esta categoría"}</h2>
        <p className={styles.subtitle}>Descubre experiencias increíbles en nuestros tours seleccionados</p>
      </div>

      <div className={styles.grid}>
        {tours.map((tour) => (
          <TourCard
            key={tour.packageId}
            title={tour.title}
            imageUrl={
              tour.mediaPackages && tour.mediaPackages.length > 0
                ? tour.mediaPackages[0].mediaUrl
                : "https://via.placeholder.com/150"
            }
            description={tour.description}
            currency={tour.price ? `$${tour.price}` : null}
            link={`/tour/${tour.packageId}`}
            type={tour.featured ? "featured" : "standard"}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoryTours

