import styles from "./PackageDetails.module.css"

const PackageDetails = ({ description, startDate, endDate, price }) => {
  return (
    <div className={styles.packageDetailsContainer}>
      {/* Columna izquierda: Descripción */}
      <div className={styles.leftColumn}>
        <div className={styles.descriptionCard}>
          <h3 className={styles.sectionTitle}>Descripción</h3>
          <p className={styles.packageDescription}>{description}</p>
        </div>
      </div>

      {/* Columna derecha: Fechas y botón */}
      <div className={styles.rightColumn}>
        <div className={styles.bookingCard}>
          <div className={styles.dateContainer}>
            <div className={styles.dateBox}>
              <label className={styles.dateLabel}>LLEGADA</label>
              <p className={styles.dateValue}>{startDate}</p>
            </div>
            <div className={styles.dateBox}>
              <label className={styles.dateLabel}>SALIDA</label>
              <p className={styles.dateValue}>{endDate}</p>
            </div>
          </div>
          <p className={styles.packagePrice}>
            <strong>Precio:</strong> ${price}
          </p>
          <button className={styles.reserveButton}>Reservar</button>
        </div>
      </div>
    </div>
  )
}

export default PackageDetails

