import styles from "./TourCard.module.css"

const TourCard = ({ title, description, imageUrl, currency, link, type }) => {
  return (
    <div className={styles.card}>
      {type === "featured" && <span className={styles.badge}>Destacado</span>}
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

