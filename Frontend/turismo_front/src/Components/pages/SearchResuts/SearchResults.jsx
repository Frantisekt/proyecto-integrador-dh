import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TourCard from "../../TourCard/TourCard";
import styles from "./SearchResults.module.css";
import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../../../config/api.config';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          size: 12
        };

        if (destination) params.destination = destination;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        const response = await axiosInstance.get(ENDPOINTS.TOUR_PACKAGES.FILTERED, { params });

        if (!response.data) {
          throw new Error("Error al obtener los paquetes de viaje");
        }

        setTours(response.data.content || []);
        setFilteredTours(response.data.content || []);
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
  }, [startDate, endDate, minPrice, maxPrice, currentPage]);

  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const params = {
          page: 0,
          size: 1000,
          sort: "title,asc"
        };

        const response = await axiosInstance.get(ENDPOINTS.TOUR_PACKAGES.PAGED, { params });
        
        if (!response.data) {
          throw new Error("Error al obtener todos los paquetes");
        }

        setTours(response.data.content || []);
      } catch (error) {
        console.error("Error al obtener todos los paquetes:", error);
        setTours([]);
      }
    };

    if (destination) {
      fetchAllTours();
    }
  }, [destination]);

  useEffect(() => {
    if (destination === "") {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter((tour) =>
        tour.title.toLowerCase().includes(destination.toLowerCase())
      );
      setFilteredTours(filtered);
    }
  }, [destination, tours]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Resultados de búsqueda</h2>
        {destination && <p className={styles.subtitle}>Destino: <span className={styles.highlight}>{destination}</span></p>}
        {startDate && <p className={styles.subtitle}>Desde: {formatDate(startDate)}</p>}
        {endDate && <p className={styles.subtitle}>Hasta: {formatDate(endDate)}</p>}
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