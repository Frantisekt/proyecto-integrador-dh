import React from "react";
import { FaCar, FaWineGlassAlt, FaUtensils, FaGlassCheers, FaHotel, FaCalendarAlt, FaMapMarkedAlt, FaSpa, FaParachuteBox, FaMountain, FaQuestionCircle } from "react-icons/fa";
import styles from "./PackageFeatures.module.css";

const iconMap = {
    "Transporte": FaCar,
    "Cata de vinos": FaWineGlassAlt,
    "Almuerzo": FaUtensils,
    "Bebidas": FaGlassCheers,
    "Alojamiento con estrellas (doradas o plateadas)": FaHotel,
    "N# días": FaCalendarAlt,
    "Tour": FaMapMarkedAlt,
    "Spa": FaSpa,
    "Gliding": FaParachuteBox,
    "Rapel": FaMountain
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
