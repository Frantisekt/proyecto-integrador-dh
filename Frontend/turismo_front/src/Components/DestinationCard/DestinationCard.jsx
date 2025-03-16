import React from 'react';
import styles from './DestinationCard.module.css';

export function DestinationCard({ city, country, flag, price, rating, image }) {
  return (
    <div className={styles.card}>
      <img src={image || "/placeholder.svg"} alt={`${city}, ${country}`} className={styles.image} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h3 className={styles.city}>{city}</h3>
        <div className={styles.countryContainer}>
          <span className={styles.flag}>{flag}</span>
          <span className={styles.country}>{country}</span>
        </div>
        <p className={styles.price}>
          Price starts at <span className={styles.priceAmount}>€{price.toFixed(2)}</span>
        </p>
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
}
