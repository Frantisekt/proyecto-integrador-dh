"use client"

import { useState } from "react"
import styles from "./TourCard.module.css"

const TourCard = ({ title, description, imageUrl, currency, link, type }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e) => {
    e.preventDefault() // Prevent navigation when clicking the heart
    setIsFavorite(!isFavorite)
    // Here you would typically call an API to save the favorite status
  }

  return (
    <div className={styles.card}>
      {type === "featured" && <span className={styles.badge}>Destacado</span>}

      <button
        className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ""}`}
        onClick={toggleFavorite}
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

