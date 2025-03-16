"use client"

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../../services/productService"; 
import TourCard from "../../TourCard/TourCard"; 
import styles from "./Products.module.css";

const Product = () => {
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);  // Estado para la página actual
  const [totalPages, setTotalPages] = useState(0);  // Estado para el total de páginas

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const { productsData, totalPages } = await obtenerProductos(page);
        setProducts(productsData);  // Reemplazar productos de la página
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [page]);  // Recargar cuando cambie la página

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(prevPage => prevPage + 1);  // Siguiente página
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);  // Página anterior
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);  // Cambiar a la página seleccionada
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        Cargando paquetes...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Nuestros Paquetes de Viaje</h2>
        </div>
        <div className={styles.noProducts}>
          <div className={styles.noProductsIcon}>🛫</div>
          <p className={styles.noProductsText}>No se encontraron productos disponibles en este momento.</p>
          <Link to="/" className={styles.backButton}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Explora Nuestros Productos</h2>
        <p className={styles.subtitle}>Descubre experiencias de viaje únicas y emocionantes</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => {
          const imageUrl = (product.mediaPackages && product.mediaPackages.length > 0 && product.mediaPackages[0].mediaUrl)
            ? product.mediaPackages[0].mediaUrl
            : "https://via.placeholder.com/150"; 

          return (
            <div key={product.packageId} className={styles.cardWrapper}>
              <TourCard
                packageId={product.packageId}
                title={product.title}
                imageUrl={imageUrl}  
                description={product.description}
                currency={product.price ? `$${product.price}` : "Precio no disponible"}
                link={`/tour/${product.packageId}`}
                type={product.featured ? "featured" : "standard"}
                initialIsFavorite={product.isFavorite}
              />
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      <div className={styles.pagination}>
        <button 
          onClick={handlePreviousPage} 
          disabled={page === 0} 
          className={styles.paginationButton}>
          Anterior
        </button>

        {/* Paginación con puntos */}
        <div className={styles.pageDots}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`${styles.pageDot} ${page === index ? styles.active : ''}`}
              onClick={() => handlePageClick(index)}
            >
              •
            </button>
          ))}
        </div>

        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages - 1} 
          className={styles.paginationButton}>
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default Product;
