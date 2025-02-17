"use client"

import { useState } from "react"
import { DestinationCard } from "../DestinationCard/DestinationCard"
import styles from "./Recommendations.module.css"

const destinations = [
  {
    city: "Cairo",
    country: "EGYPT",
    flag: "🇪🇬",
    price: 105.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/ee/6a/75/ee6a758527e6c2d73e21fcce64f2a4f8.jpg",
  },
  {
    city: "Paris",
    country: "FRANCE",
    flag: "🇫🇷",
    price: 95.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/96/40/a3/9640a3b700b03d31e4ac70fc76a3da88.jpg",
  },
  {
    city: "Rome",
    country: "ITALY",
    flag: "🇮🇹",
    price: 75.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/34/a8/b9/34a8b96ee490128a9e249bf70ca17227.jpg",
  },
  {
    city: "Madrid",
    country: "SPAIN",
    flag: "🇪🇸",
    price: 87.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/32/2c/c0/322cc096f155046a3691e71cf45e3a92.jpg",
  },
];

  
  export function Recommendations() {
    const [currentIndex, setCurrentIndex] = useState(0)
  
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1))
    }
  
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1))
    }
  
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.label}>RECOMMENDATIONS</span>
            <h2 className={styles.title}>Recomendaciones</h2>
            <p className={styles.description}>
              Explore our curated selection of the world's most sought-after travel spots in this diverse list of
              must-visit places. From iconic cities to pristine natural wonders, we've gathered the best destinations to
              ignite your wanderlust.
            </p>
          </div>
  
          <div className={styles.carouselWrapper}>
            <div className={styles.carouselContainer}>
              <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`}>
                ‹
              </button>
  
              <div className={styles.carousel}>
                <div className={styles.carouselInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {destinations.map((destination, index) => (
                    <DestinationCard key={index} {...destination} />
                  ))}
                </div>
              </div>
  
              <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`}>
                ›
              </button>
  
              <div className={styles.indicators}>
                {destinations.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ""}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }