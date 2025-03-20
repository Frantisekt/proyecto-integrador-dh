import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TourCard from "../../TourCard/TourCard";
import styles from "./SearchResults.module.css";

const SearchResults = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Error al obtener los paquetes de viaje:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
    window.scrollTo(0, 0);
  }, [destination, startDate, endDate, minPrice, maxPrice, currentPage]);

  // Función para corregir el formato de la fecha en la vista
  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00"); // Evita problemas de zona horaria
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Resultados de búsqueda</h2>
        <p className={styles.subtitle}>
          {destination && <span>Destino: <span className={styles.highlight}>{destination}</span></span>}
          {startDate && ` • Desde: ${formatDateDisplay(startDate)}`}
          {endDate && ` • Hasta: ${formatDateDisplay(endDate)}`}
          {minPrice && ` • Precio mínimo: $${minPrice}`}
          {maxPrice && ` • Precio máximo: $${maxPrice}`}
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Cargando paquetes...</p>
        </div>
      ) : tours.length > 0 ? (
        <div className={styles.grid}>
          {tours.map((tour) => {
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
