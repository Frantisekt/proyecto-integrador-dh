import { useState } from "react";
import styles from "./ReservationDetails.module.css"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Modal, Button } from "react-bootstrap";
import { Minus, Plus } from "lucide-react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { reservationService } from '../services/reservationService';
import { authService } from '../services/authService';

const Division = () => (<hr className={styles.division}/>);

const GuestModal = ({ show, onHide, guests, onChange }) => {
  console.log(guests)
  const changeCount = (type, delta) => {
    const updated = {
      ...guests,
      [type]: Math.max(0, guests[type] + delta),
    };
    if (type === "adults" && updated.adults === 0) return;
    onChange(updated);
  };

  const items = [
    { key: "adults", label: "Adultos", desc: "Mayores de 13 años" },
    { key: "children", label: "Niños", desc: "De 2 a 12 años" },
    { key: "infants", label: "Bebés", desc: "Menores de 2 años" },
  ];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={styles.modalTitle}>Huéspedes</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items.map(({ key, label, desc }) => (
          <div key={key} className="d-flex justify-content-between align-items-center py-2">
            <div>
              <div className={styles.modalLabel}>{label}
                
              </div>
              <div className="text-muted small">{desc}</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => changeCount(key, -1)}
                disabled={guests[key] === 0 || (key === "adults" && guests.adults === 1)}
              >
                <Minus size={16} />
              </Button>
              <span className={styles.modalGuestTotal}>{guests[key]}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => changeCount(key, 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>
          Aplicar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const ReservationDetails = ({ id, title, startDate, endDate, price }) => {
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const totalGuests = () => {
    const { adults, children, infants, pets } = guests;
    return adults + children + infants + pets;
  }

  const calculateTotalAmount = () => {
    const adultTotal = guests.adults * price;
    const childTotal = guests.children * (price * 0.5); // 50% para niños
    return adultTotal + childTotal;
  };

  const handleReservation = async () => {
    try {
        if (!authService.isAuthenticated()) {
            Swal.fire({
                title: 'No has iniciado sesión',
                text: 'Necesitas iniciar sesión para hacer una reservación',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ir a iniciar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/auth');
                }
            });
            return;
        }

        const userData = authService.getCurrentUser();
        
        const reservationData = {
            userId: userData.userId,
            packageId: parseInt(id),
            numberOfAdults: parseInt(guests.adults),
            numberOfChildren: parseInt(guests.children),
            numberOfInfants: parseInt(guests.infants),
            confirmationStatus: "PENDING",
            rating: "0"
        };

        console.log('Datos de la reservación a enviar:', reservationData);

        const response = await reservationService.createReservation(reservationData);
        console.log('Respuesta del servidor:', response);
        
        if (response) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'Reservación creada correctamente',
                icon: 'success',
                confirmButtonText: 'Ver mis reservaciones'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/mis-reservaciones');
                }
            });
        }
    } catch (error) {
        console.error('Error detallado:', error.response?.data || error.message);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo crear la reservación. Por favor, intenta de nuevo.',
            icon: 'error'
        });
    }
  };

  return (
    <div className={styles.packageDetailsContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.descriptionCard}>
          <h3 className={styles.sectionTitle}>Tu Reserva</h3>
          
          <p><b>Paquete</b></p>
          <p>{title}</p>

          <p><b>Fechas</b></p>
          <p>{format(startDate, "d 'de' MMM", {locale: es})} - {format(endDate, "d 'de' MMM", {locale: es})}</p>
          
          <p style={{display: 'flex', justifyContent: 'space-between'}}>
            <b>Huéspedes</b> 
            <span onClick={() => setShowModal(true)} className={styles.editGuest}>Edita</span>
          </p>
          <p>{totalGuests()} huésped{totalGuests() !== 1 ? 'es' : ''}</p>

          <Division />

          <div className={styles.priceDetails}>
            <p><b>Precio por adulto:</b> ${price}</p>
            <p><b>Precio por niño:</b> ${price * 0.5}</p>
            <p><b>Infantes:</b> Gratis</p>
            <p className={styles.totalPrice}><b>Total:</b> ${calculateTotalAmount()}</p>
          </div>

          <button 
            className={styles.reserveButton} 
            onClick={handleReservation}
          >
            Confirmar Reserva
          </button>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.bookingCard}>
          <p>Detalle mas imagen</p>
          <Division/>
          <p>Total</p>
        </div>
      </div>

      <GuestModal
        show={showModal}
        onHide={() => setShowModal(false)}
        guests={guests}
        onChange={setGuests}
      />
    </div>
  );
};

export default ReservationDetails;