import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TourCard from "../../TourCard/TourCard";
import styles from "./SearchResults.module.css";

const SearchResults = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination") || "";
  const startDate = queryParams.get("startDate") || "";
  const endDate = queryParams.get("endDate") || "";
  const minPrice = queryParams.get("minPrice") || "";
  const maxPrice = queryParams.get("maxPrice") || "";

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const url = new URL("http://localhost:8087/api/tourPackages/filtered");
        url.searchParams.append("page", currentPage);
        url.searchParams.append("size", 8);

        if (destination) url.searchParams.append("destination", destination);
        if (startDate) url.searchParams.append("startDate", startDate);
        if (endDate) url.searchParams.append("endDate", endDate);
        if (minPrice) url.searchParams.append("minPrice", minPrice);
        if (maxPrice) url.searchParams.append("maxPrice", maxPrice);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener los paquetes de viaje");
        }

        const data = await response.json();
        setTours(data.content || []);
        setFilteredTours(data.content || []);
      } catch (error) {
        console.error("Error al obtener los paquetes de viaje:", error);
        setTours([]);
        setFilteredTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
    window.scrollTo(0, 0);
  }, [destination, startDate, endDate, minPrice, maxPrice, currentPage]);

  // Filtrar los tours por destino (título del paquete) cuando el estado destination cambie
  useEffect(() => {
    if (destination === "") {
      setFilteredTours(tours); // Si no hay filtro, mostrar todos los tours
    } else {
      const filtered = tours.filter((tour) =>
        tour.title.toLowerCase().includes(destination.toLowerCase()) // Comparar con cualquier parte del título
      );
      setFilteredTours(filtered);
    }
  }, [destination, tours]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Resultados de búsqueda</h2>
        {destination && <p className={styles.subtitle}>Destino: <span className={styles.highlight}>{destination}</span></p>}
        {startDate && <p className={styles.subtitle}>Desde: {new Date(startDate).toLocaleDateString()}</p>}
        {endDate && <p className={styles.subtitle}>Hasta: {new Date(endDate).toLocaleDateString()}</p>}
        {minPrice && <p className={styles.subtitle}>Precio mínimo: ${minPrice}</p>}
        {maxPrice && <p className={styles.subtitle}>Precio máximo: ${maxPrice}</p>}
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Cargando paquetes...</p>
        </div>
      ) : filteredTours.length > 0 ? (
        <div className={styles.grid}>
          {filteredTours.map((tour) => {
            const imageUrl = tour.mediaPackages?.[0]?.mediaUrl || "https://via.placeholder.com/150";

            return (
              <div className={styles.cardWrapper} key={tour.id}>
                <TourCard
                  title={tour.title}
                  description={tour.description}
                  imageUrl={imageUrl}
                  currency={tour.price ? `$${tour.price}` : "Precio no disponible"}
                  link={`/tour/${tour.packageId}`}
                  packageId={tour.packageId}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>No se encontraron paquetes disponibles para tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
