import styles from "./PackageDetails.module.css"
import CalendarTooltip from "../calendarToolTip/CalendarToolTip"

const PackageDetails = ({ description, startDate, endDate, price }) => {
  return (
    <div className={styles.packageDetailsContainer}>

      <div className={styles.leftColumn}>
        <div className={styles.descriptionCard}>
          <h3 className={styles.sectionTitle}>Descripción</h3>
          <p className={styles.packageDescription}>{description}</p>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.bookingCard}>
          <div className={styles.dateContainer}>
            <div className={styles.dateBox}>
              <div style={{ width: "100%" }}>
                <label className={styles.dateLabel}>
                  FECHA LLEGADA: <br />
                </label>
              </div>
              <CalendarTooltip startDate={startDate} endDate={endDate}>
                <p className={styles.dateValue}>{startDate}</p>
              </CalendarTooltip>
            </div>
            <div className={styles.dateBox}>
              <div style={{ width: "100%" }}>
                <label className={styles.dateLabel}>
                  FECHA SALIDA: <br />
                </label>
              </div>
              <CalendarTooltip startDate={startDate} endDate={endDate}>
                <p className={styles.dateValue}>{endDate}</p>
              </CalendarTooltip>
            </div>

          </div>
          <p className={styles.packagePrice}>
            <strong>Precio:</strong> ${price}
          </p>
          <button className={styles.reserveButton}>Reservar</button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;