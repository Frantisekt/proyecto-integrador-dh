import styles from "./PackageDetails.module.css"
import CalendarTooltip from "../calendarToolTip/CalendarToolTip"
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { authService } from '../services/authService';

const PackageDetails = ({ description, startDate, endDate, price, id }) => {
  const navigate = useNavigate();
  
  console.log('PackageDetails props:', { id, description, startDate, endDate, price });

  const handleReservation = () => {
    // Verificar si el usuario está autenticado
    if (!authService.isAuthenticated()) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Necesitas iniciar sesión para realizar una reserva",
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

    // Si está autenticado, proceder con la navegación a la reserva
    navigate(`/reservation/${id}`, {
      state: {
        id: id,
        title: description,
        startDate: startDate,
        endDate: endDate,
        price: price
      }
    });
  };

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
          <button 
            className={styles.reserveButton} 
            onClick={handleReservation}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

PackageDetails.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default PackageDetails;