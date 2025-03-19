// Hero.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [startDate, setStartDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!startDate) {
      alert("Por favor, selecciona una fecha de inicio.");
      return;
    }
    navigate(`/search-results?destination=${destination}&travelers=${travelers}&startDate=${startDate}`);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.heroTextContainer}>
          <h2 className={styles.heroText}>
            Si estás en busca de aventuras emocionantes, experiencias inolvidables y lugares impresionantes para explorar, ¡has llegado al lugar indicado!
          </h2>
        </div>
        <div className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInner}>
              <h3 className={styles.searchTitle}>Planea tu viaje ahora</h3>
              <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                  <label>Buscar destino*</label>
                  <input type="text" placeholder="Ingrese destino" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Nro. de viajeros*</label>
                  <input type="number" placeholder="Nro. de viajeros" min="1" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Fecha prevista*</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <button type="button" onClick={handleSearch}>BUSCAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
