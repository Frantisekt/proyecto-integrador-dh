import React from "react";
import { FaCar, FaWineGlassAlt, FaUtensils, FaGlassCheers, FaHotel, FaCalendarAlt, FaMapMarkedAlt, FaSpa, FaParachuteBox, FaMountain, FaQuestionCircle } from "react-icons/fa";
import styles from "./PackageFeatures.module.css";

const iconMap = {
    "TRANSPORTE": FaCar,
    "CATA DE VINOS": FaWineGlassAlt,
    "ALMUERZO": FaUtensils,
    "BEBIDAS": FaGlassCheers,
    "ALOJAMIENTO_1": FaHotel,
    "ALOJAMIENTO_2": FaHotel,
    "ALOJAMIENTO_3": FaHotel,
    "N# días": FaCalendarAlt,
    "TOUR": FaMapMarkedAlt,
    "SPA": FaSpa,
    "GLIDING": FaParachuteBox,
    "RAPEL": FaMountain
};

const PackageFeatures = ({ features }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Características</h2>
            <div className={styles.grid}>
                {features.map((feature, index) => {
                    const Icon = iconMap[feature] || FaQuestionCircle;
                    return (
                        <div key={index} className={styles.featureItem}>
                            <Icon className={styles.icon} />
                            <span className={styles.text}>{feature}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PackageFeatures;
