import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <div className={styles.heroTextContainer}>
          <h2 className={styles.heroText}>
          Si estás en busca de aventuras emocionantes, experiencias inolvidables 
          y lugares impresionantes para explorar, ¡has llegado al lugar indicado!
          </h2>
        </div>

        <div className={styles.searchWrapper}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInner}>
              <h3 className={styles.searchTitle}>Planea tu viaje ahora</h3>
              <div className={styles.searchBar}>
                <div className={styles.inputGroup}>
                  <label>Buscar destino*</label>
                  <input 
                    type="text" 
                    placeholder="Ingrese destino" 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Nro. de viajeros*</label>
                  <input 
                    type="number" 
                    placeholder="Nro. de viajeros" 
                    min="1"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Fecha prevista*</label>
                  <input 
                    type="date" 
                    placeholder="MM / YYYY" 
                  />
                </div>
                <button type="button">BUSCAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;