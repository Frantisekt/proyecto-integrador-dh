import React from "react";
import Hero from "../../Hero/Hero"; 
import Categories from "../../Categories/Categories";
import { Recommendations } from "../../Recomendations/Recomendations";
import PriceFilter from "../../PriceFilter/PriceFilter";
import styles from "./Home.module.css"; 

const Home = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <Categories />
      <section className={styles.filterSection}>
        <PriceFilter />
      </section>
      <Recommendations />

      {/* Botón flotante de WhatsApp con mensaje predefinido */}
      <a 
        href="https://wa.me/573183049356?text=Hola%20GlobeOnClick,%20estoy%20interesado%20en%20obtener%20más%20información%20sobre%20sus%20paquetes%20de%20viaje.%20¿Podrían%20ayudarme?" 
        className={styles.whatsappButton}
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <div className={styles.whatsappButtonInner}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
            alt="WhatsApp" 
          />
        </div>
        <span className={styles.tooltip}>¿Necesitas ayuda? ¡Escríbenos!</span>
      </a>
    </div>
  );
};

export default Home;
