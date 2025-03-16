import React from "react";
import { FaCar, FaWineGlassAlt, FaUtensils, FaTicketAlt, FaGlassCheers, FaHotel, FaMapMarkedAlt, FaSpa, FaParachuteBox, FaMountain, FaQuestionCircle, FaBed, FaBicycle, FaTree, FaUmbrellaBeach, FaUserShield, FaCameraRetro, FaTheaterMasks, FaHotTub, FaSkiing, FaHiking, FaShip, FaHelicopter, FaGlobe, FaWifi } from "react-icons/fa";
import styles from "./PackageFeatures.module.css";

const iconMap = {
    "TRANSPORTE": FaCar,
    "CATA_DE_VINOS": FaWineGlassAlt,
    "ALMUERZO": FaUtensils,
    "BEBIDAS": FaGlassCheers,
    "ALOJAMIENTO_1": FaHotel,
    "ALOJAMIENTO_2": FaBed,
    "ALOJAMIENTO_3": FaBed,
    "ALOJAMIENTO_4": FaTree,
    "ALOJAMIENTO_5": FaHotel,
    "TOUR": FaMapMarkedAlt,
    "SPA": FaSpa,
    "GLIDING": FaParachuteBox,
    "RAPEL": FaMountain,
    "ACCESO_A_SPA": FaHotTub,
    "ACCESO_VIP": FaUserShield,
    "ACTIVIDADES": FaHiking,
    "ACTIVIDADES_ACUATICAS": FaUmbrellaBeach,
    "AVISTAMIENTO_DE_AVES": FaCameraRetro,
    "BUCEO_CERTIFICADO": FaGlobe,
    "CAMPING_DE_LUJO": FaTree,
    "CENA_ROMANTICA": FaUtensils,
    "CENAS_INCLUIDAS": FaUtensils,
    "CLASE_DE_COCINA": FaUtensils,
    "CLASE_DE_YOGA": FaSpa,
    "ENTRADAS_INCLUIDAS": FaTicketAlt,
    "ESQUI_EN_NIEVE": FaSkiing,
    "EXPERIENCIA_4X4": FaCar,
    "EXPERIENCIA_CULTURAL": FaTheaterMasks,
    "EXCURSION_EN_CAMELLO": FaTree,
    "FOTOGRAFIA_PROFESIONAL": FaCameraRetro,
    "GUIA_EN_ESPANOL": FaUserShield,
    "GUIA_TURISTICO": FaUserShield,
    "MASAJE_RELAJANTE": FaSpa,
    "PASEO_EN_GLOBO": FaParachuteBox,
    "RENTA_DE_BICIS": FaBicycle,
    "SAFARI_OPCIONAL": FaTree,
    "SEGURO_DE_VIAJE": FaUserShield,
    "SHOW_NOCTURNO": FaTheaterMasks,
    "TALLER_ARTESANAL": FaTheaterMasks,
    "TIEMPO_LIBRE": FaUmbrellaBeach,
    "TOUR_EN_BARCO": FaShip,
    "TOUR_EN_HELICOPTERO": FaHelicopter,
    "TRANSPORTE_24_7": FaCar,
    "TRANSPORTE_PRIVADO": FaCar,
    "TREKKING_GUIADO": FaHiking,
    "VISITA_A_MUSEOS": FaTheaterMasks,
    "VISITAS_ARQUEOLOGICAS": FaTheaterMasks,
    "VUELOS_INCLUIDOS": FaGlobe,
    "WIFI_GRATUITO": FaWifi,
    "VENTILADOR": FaWifi
};

const PackageFeatures = ({ features }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Características</h2>
            <div className={styles.grid}>
                {features.map((feature, index) => {
                    const Icon = iconMap[feature.name] || FaQuestionCircle;
                    return (
                        <div key={index} className={styles.featureItem}>
                            <Icon className={styles.icon} />
                            <span className={styles.text}>{feature.displayName}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PackageFeatures;
