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
  const travelers = queryParams.get("travelers") || "1";
  const startDate = queryParams.get("startDate") || "";
  const endDate = "2025-03-15"; // Fecha límite predeterminada

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8087/api/tourPackages/filtered?page=${currentPage}&size=8&startDate=${startDate}&endDate=${endDate}`
        );

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
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [startDate, endDate, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Resultados de búsqueda</h2>
        {destination && (
          <p className={styles.subtitle}>
            Destino: <span className={styles.highlight}>{destination}</span> • 
            Viajeros: <span className={styles.highlight}>{travelers}</span>
            {startDate && ` • Desde: ${new Date(startDate).toLocaleDateString()}`}
          </p>
        )}
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Cargando paquetes...</p>
        </div>
      ) : tours.length > 0 ? (
        <>
          <div className={styles.grid}>
            {tours.map((tour) => {
              const imageUrl =
                tour.mediaPackages && tour.mediaPackages.length > 0 && tour.mediaPackages[0].mediaUrl
                  ? tour.mediaPackages[0].mediaUrl
                  : "https://via.placeholder.com/150"; // Imagen por defecto

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

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                className={styles.paginationButton} 
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                ← Anterior
              </button>
              <span className={styles.pageInfo}>
                Página {currentPage + 1} de {totalPages}
              </span>
              <button 
                className={styles.paginationButton} 
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <p className={styles.noResultsText}>
            No se encontraron paquetes disponibles para tu búsqueda.
          </p>
          <a href="/" className={styles.backButton}>
            Volver a buscar
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
