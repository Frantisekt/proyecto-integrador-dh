import React from 'react';
import styles from "./PackageDetails.module.css";

const PackageDetails = ({ description, categoryTitle, categoryDescription, price, currency, restrictions, mediaTitle, mediaDescription }) => {
    return (
        <div className={styles.packageDetailsContainer}>
            <h2 className={styles.packageDescription}><strong>{description}</strong> </h2>
            <h4 className={styles.categoryTitle}><strong>{categoryTitle}</strong></h4>
            <p className={styles.categoryDescription}>{categoryDescription}</p>
            <h4 className={styles.packagePrice}><strong>Precio:</strong> {price} {currency}</h4>
            <h4 className={styles.packageRestrictions}><strong>Restricciones:</strong> {restrictions}</h4>
            <div className={styles.mediaSection}>
                <h4 className={styles.mediaTitle}><strong>{mediaTitle}</strong></h4>
                <p className={styles.mediaDescription}>{mediaDescription}</p>
            </div>
            <button className={styles.reserveButton}><link rel="stylesheet" href="#" />Reservar</button>
        </div>
    );
}

export default PackageDetails;
