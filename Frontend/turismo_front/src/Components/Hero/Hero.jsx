"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Hero.module.css"

const Hero = () => {
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!startDate && !endDate && !destination && !minPrice && !maxPrice) {
      alert("Por favor, ingresa al menos un criterio de búsqueda.")
      return
    }

    const queryParams = new URLSearchParams()

    if (destination) queryParams.append("destination", destination)
    if (startDate) queryParams.append("startDate", formatDate(startDate))
    if (endDate) queryParams.append("endDate", formatDate(endDate))
    if (minPrice) queryParams.append("minPrice", minPrice)
    if (maxPrice) queryParams.append("maxPrice", maxPrice)

    navigate(`/search-results?${queryParams.toString()}`)
  }

  // Función para formatear la fecha en YYYY-MM-DD sin modificar la zona horaria
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0] // Extrae solo la parte de la fecha
  }

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.heroTextContainer}>
          <h2 className={styles.heroText}>
            Si estás en busca de aventuras emocionantes, experiencias inolvidables y lugares impresionantes para
            explorar, ¡has llegado al lugar indicado!
          </h2>
        </div>
        <div className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInner}>
              <h3 className={styles.searchTitle}>Planea tu viaje ahora</h3>
              <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                  <label>Buscar destino</label>
                  <input
                    type="text"
                    placeholder="Ingrese destino"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Fecha de inicio</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Fecha de fin</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Precio mínimo</label>
                  <input
                    type="number"
                    placeholder="Mínimo"
                    min="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Precio máximo</label>
                  <input
                    type="number"
                    placeholder="Máximo"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <button type="button" onClick={handleSearch}>
                  BUSCAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

