"use client"

import { useState } from "react"
import styles from "./ReservationDetails.module.css"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Modal, Button } from "react-bootstrap"
import { Minus, Plus, Calendar, Users, MapPin, CreditCard, Clock, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { reservationService } from "../services/reservationService"
import { authService } from "../services/authService"
import Swal from "sweetalert2"

const Division = () => <hr className={styles.division} />

const GuestModal = ({ show, onHide, guests, onChange }) => {
  const changeCount = (type, delta) => {
    const updated = {
      ...guests,
      [type]: Math.max(0, guests[type] + delta),
    }
    if (type === "adults" && updated.adults === 0) return
    onChange(updated)
  }

  const items = [
    { key: "adults", label: "Adultos", desc: "Mayores de 13 años" },
    { key: "children", label: "Niños", desc: "De 2 a 12 años" },
    { key: "infants", label: "Bebés", desc: "Menores de 2 años" },
  ]

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={styles.modalTitle}>Huéspedes</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items.map(({ key, label, desc }) => (
          <div key={key} className="d-flex justify-content-between align-items-center py-3">
            <div>
              <div className={styles.modalLabel}>{label}</div>
              <div className="text-muted small">{desc}</div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="outline-secondary"
                size="sm"
                className={styles.guestButton}
                onClick={() => changeCount(key, -1)}
                disabled={guests[key] === 0 || (key === "adults" && guests.adults === 1)}
              >
                <Minus size={16} />
              </Button>
              <span className={styles.modalGuestTotal}>{guests[key]}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                className={styles.guestButton}
                onClick={() => changeCount(key, 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className={styles.applyButton} onClick={onHide}>
          Aplicar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const ReservationDetails = ({ id, title, startDate, endDate, price, image, location }) => {
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  })
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  // Función para formatear fechas correctamente
  const formatDate = (date) => {
    // Asegurarse de que la fecha es un objeto Date
    const dateObj = date instanceof Date ? date : new Date(date)

    // Crear una nueva fecha con el mismo año, mes y día pero a mediodía para evitar problemas de zona horaria
    const correctedDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 12, 0, 0)

    return correctedDate
  }

  const totalGuests = () => {
    const { adults, children, infants, pets } = guests
    return adults + children + infants + pets
  }

  const calculateTotalAmount = () => {
    const adultTotal = guests.adults * price
    const childTotal = guests.children * (price * 0.5)
    return adultTotal + childTotal
  }

  // Calcular la duración de la estancia en días
  const calculateDuration = () => {
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleReservation = async () => {
    try {
      if (!authService.isAuthenticated()) {
        Swal.fire({
          title: "No has iniciado sesión",
          text: "Necesitas iniciar sesión para hacer una reservación",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ir a iniciar sesión",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/auth")
          }
        })
        return
      }

      const userData = authService.getCurrentUser()

      const reservationData = {
        userId: userData.userId,
        packageId: Number.parseInt(id),
        numberOfAdults: Number.parseInt(guests.adults),
        numberOfChildren: Number.parseInt(guests.children),
        numberOfInfants: Number.parseInt(guests.infants),
        confirmationStatus: "PENDING",
        rating: "0",
      }

      const response = await reservationService.createReservation(reservationData)

      Swal.fire({
        title: "¡Reserva creada con éxito!",
        text: "Te hemos enviado un correo con los detalles de tu reserva",
        icon: "success",
        confirmButtonText: "Ver mis reservaciones",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/mis-reservaciones")
        }
      })
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la reservación. Por favor, intenta de nuevo.",
        icon: "error",
      })
    }
  }

  // Formatear las fechas correctamente
  const formattedStartDate = formatDate(startDate)
  const formattedEndDate = formatDate(endDate)

  return (
    <div className={styles.packageDetailsContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.descriptionCard}>
          <div className={styles.packageHeader}>
            <h2 className={styles.packageTitle}>{title}</h2>
            {location && (
              <div className={styles.packageLocation}>
                <MapPin className={styles.locationIcon} size={18} />
                <span>{location}</span>
              </div>
            )}
          </div>

          <h3 className={styles.sectionTitle}>
            <Calendar className={styles.sectionIcon} size={20} />
            Fechas de tu viaje
          </h3>

          <div className={styles.dateContainer}>
            <div className={styles.dateBox}>
              <span className={styles.dateLabel}>Salida</span>
              <p className={styles.dateValue}>{format(formattedStartDate, "d 'de' MMMM, yyyy", { locale: es })}</p>
            </div>
            <div className={styles.dateBox}>
              <span className={styles.dateLabel}>Llegada</span>
              <p className={styles.dateValue}>{format(formattedEndDate, "d 'de' MMMM, yyyy", { locale: es })}</p>
            </div>
          </div>

          <div className={styles.guestSection}>
            <div className={styles.guestHeader}>
              <h3 className={styles.sectionTitle}>
                <Users className={styles.sectionIcon} size={20} />
                Huéspedes
              </h3>
              <button onClick={() => setShowModal(true)} className={styles.editGuest}>
                Editar
              </button>
            </div>
            <div className={styles.guestSummary}>
              {guests.adults > 0 && (
                <span>
                  {guests.adults} adulto{guests.adults !== 1 ? "s" : ""}
                </span>
              )}
              {guests.children > 0 && (
                <span>
                  {guests.children} niño{guests.children !== 1 ? "s" : ""}
                </span>
              )}
              {guests.infants > 0 && (
                <span>
                  {guests.infants} bebé{guests.infants !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          <Division />

          <div className={styles.packageDescription}>
            <h3 className={styles.sectionTitle}>
              <Info className={styles.sectionIcon} size={20} />
              Detalles del paquete
            </h3>
            <p>
              Este paquete incluye transporte, alojamiento y actividades para disfrutar de una experiencia inolvidable.
              Nuestro equipo estará disponible para asistirte durante todo tu viaje.
            </p>
            <p>Recuerda llevar ropa cómoda, protector solar y tu cámara para capturar los mejores momentos.</p>
          </div>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.bookingCard}>
          <div className={styles.imageCarousel}>
            {image ? (
              <img src={image || "/placeholder.svg"} alt={title} className={styles.carouselImage} />
            ) : (
              <div
                className={styles.carouselImage}
                style={{ backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <span>Imagen no disponible</span>
              </div>
            )}
          </div>

          <h3 className={styles.sectionTitle}>{title}</h3>

          {location && (
            <div className={styles.packageLocation}>
              <MapPin className={styles.locationIcon} size={18} />
              <span>{location}</span>
            </div>
          )}

          <Division />

          <div className={styles.priceDetails}>
            <div className={styles.priceRow}>
              <span>Fechas:</span>
              <span>
                {format(formattedStartDate, "d MMM", { locale: es })} -{" "}
                {format(formattedEndDate, "d MMM", { locale: es })}
              </span>
            </div>
            <div className={styles.priceRow}>
              <span>Huéspedes:</span>
              <span>{totalGuests()} en total</span>
            </div>
            <div className={styles.priceRow}>
              <span>Duración:</span>
              <span>{calculateDuration()} días</span>
            </div>
          </div>

          <Division />

          <div className={styles.pricingSummary}>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingTitle}>
                <CreditCard className={styles.sectionIcon} size={20} />
                Resumen de precios
              </h3>
              <span className={styles.tripDuration}>
                <Clock size={14} style={{ marginRight: "5px" }} />
                {calculateDuration()} días
              </span>
            </div>

            <div className={styles.priceCalculation}>
              <div className={styles.calculationRow}>
                <span>Precio por adulto</span>
                <span>${price.toLocaleString()}</span>
              </div>
              <div className={styles.calculationRow}>
                <span>Precio por niño (50%)</span>
                <span>${(price * 0.5).toLocaleString()}</span>
              </div>
              <div className={styles.calculationRow}>
                <span>Infantes</span>
                <span>Gratis</span>
              </div>
              <div className={styles.calculationRow}>
                <span>
                  {guests.adults} adulto{guests.adults !== 1 ? "s" : ""}
                </span>
                <span>${(guests.adults * price).toLocaleString()}</span>
              </div>
              {guests.children > 0 && (
                <div className={styles.calculationRow}>
                  <span>
                    {guests.children} niño{guests.children !== 1 ? "s" : ""}
                  </span>
                  <span>${(guests.children * (price * 0.5)).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className={styles.totalPrice}>
              <span>Total</span>
              <span>${calculateTotalAmount().toLocaleString()}</span>
            </div>

            <button className={styles.reserveButton} onClick={handleReservation}>
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>

      <GuestModal show={showModal} onHide={() => setShowModal(false)} guests={guests} onChange={setGuests} />
    </div>
  )
}

export default ReservationDetails

