"use client"

import { useState, useEffect } from "react"
import { DestinationCard } from "../DestinationCard/DestinationCard"
import styles from "./Recommendations.module.css"

const destinationsData = [
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
  {
    city: "Kyoto",
    country: "JAPAN",
    flag: "🇯🇵",
    price: 120.0,
    rating: 5,
    image: "https://i.pinimg.com/736x/9d/d8/c8/9dd8c8713840334278bf6e9ad61ffa62.jpg",
  },
  {
    city: "Ibiza",
    country: "SPAIN",
    flag: "🇪🇸",
    price: 150.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/df/9d/78/df9d7830bf06c4678092bd5f49e534bd.jpg",
  },
  {
    city: "Maldives",
    country: "MALDIVES",
    flag: "🇲🇻",
    price: 200.0,
    rating: 5,
    image: "https://i.pinimg.com/736x/7f/58/b8/7f58b88c8476330c5388d5408110efaa.jpg",
  },
  {
    city: "Santorini",
    country: "GREECE",
    flag: "🇬🇷",
    price: 180.0,
    rating: 5,
    image: "https://i.pinimg.com/736x/ef/75/1e/ef751e5a5d81a77e9e12dd93dc66f888.jpg",
  },
  {
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    price: 250.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/81/f0/db/81f0db8467ae5ded650017f0a5bd0b83.jpg",
  },
  {
    city: "Serengeti",
    country: "TANZANIA",
    flag: "🇹🇿",
    price: 300.0,
    rating: 5,
    image: "https://i.pinimg.com/736x/be/d7/8b/bed78bf589d6c2733d389a8c19beffec.jpg",
  },
  {
    city: "Norway",
    country: "NORWAY",
    flag: "🇳🇴",
    price: 220.0,
    rating: 5,
    image: "https://i.pinimg.com/736x/fc/b5/fc/fcb5fc84e55c35ca07875b28df8ca365.jpg",
  },
  {
    city: "Machu Picchu",
    country: "PERU",
    flag: "🇵🇪",
    price: 130.0,
    rating: 5,
    image: "https://i.pinimg.com/736x/ec/a0/6c/eca06c36780650acc4335c4fd2e9eefa.jpg",
  },
  {
    city: "Quebec",
    country: "CANADA",
    flag: "🇨🇦",
    price: 140.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/7e/f1/22/7ef12207ac9db63dcea8d26bfd5cc0f1.jpg",
  },
  {
    city: "Viena",
    country: "AUSTRIA",
    flag: "🇦🇹",
    price: 110.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/84/48/d8/8448d8e1b7b4ad38a8f03e73a4625a4d.jpg",
  },
  {
    city: "Tulum",
    country: "MEXICO",
    flag: "🇲🇽",
    price: 90.0,
    rating: 4,
    image: "https://i.pinimg.com/736x/44/52/7e/44527e028ab69c627a229567fb298ed0.jpg",
  },
]

export function Recommendations() {
  const [destinations, setDestinations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(window.innerWidth < 768 ? 1 : 4);


  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const shuffledDestinations = shuffleArray([...destinationsData]);
    setDestinations(shuffledDestinations);
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth < 768 ? 1 : 4);
    };

    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const padDestinations = () => {
    const remainder = destinations.length % cardsPerView;
    if (remainder === 0) return destinations;
    return [...destinations, ...Array(cardsPerView - remainder).fill(null)];
  };

  const paddedDestinations = padDestinations();
  const viewCount = Math.ceil(paddedDestinations.length / cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === viewCount - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? viewCount - 1 : prev - 1));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>RECOMMENDATIONS</span>
          <h2 className={styles.title}>Recomendaciones</h2>
          <p className={styles.description}>
            Explore our curated selection of the world's most sought-after travel spots in this diverse list of must-visit places.
          </p>
        </div>

        <div className={styles.carouselWrapper}>
          <div className={styles.carouselContainer}>
            {viewCount > 1 && <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`}>‹</button>}

            <div className={styles.carousel}>
              <div className={styles.carouselInner} style={{ transform: `translateX(-${currentIndex * (100 / viewCount)}%)`, width: `${viewCount * 100}%` }}>
                {paddedDestinations.map((destination, index) => (
                  <div key={index} className={styles.carouselItem} style={{ width: `${100 / cardsPerView}%` }}>
                    {destination ? <DestinationCard {...destination} /> : <div className={styles.emptyCard} />}
                  </div>
                ))}
              </div>
            </div>

            {viewCount > 1 && <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`}>›</button>}
          </div>
        </div>
      </div>
    </section>
  );
}


