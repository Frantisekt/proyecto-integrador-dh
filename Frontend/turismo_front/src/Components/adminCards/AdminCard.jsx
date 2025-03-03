import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminCard.module.css";

const AdminCard = ({ options }) => {
    return (
        <div className={styles.cardContainer}>
            {options.map((option, index) => {
                const IconComponent = option.icon; 
                return (
                    <div key={index} className={styles.card} style={{ backgroundColor: option.color }}>
                        <div className={styles.cardBody}>
                            <IconComponent className={styles.icon} />
                            <h3 className={styles.cardTitle}>{option.title}</h3>
                            <p className={styles.cardText}>{option.description}</p>
                            <Link to={option.path} className={styles.button}>{option.name}</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AdminCard;
