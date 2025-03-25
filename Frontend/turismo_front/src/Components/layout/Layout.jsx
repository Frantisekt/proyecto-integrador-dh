import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '../Header/Header';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>

            {/* Botón flotante de WhatsApp */}
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
                <span className={styles.tooltip}>
                    ¿Necesitas ayuda? ¡Escríbenos!
                </span>
            </a>
        </div>
    );
};

export default Layout;
