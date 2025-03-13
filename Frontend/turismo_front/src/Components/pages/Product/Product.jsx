import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../../services/productService"; 
import TourCard from "../../TourCard/TourCard"; 
import styles from "./Products.module.css";

const Product = () => {
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const { productsData } = await obtenerProductos();
        setProducts(productsData);  
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);  

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
            <TourCard
              key={product.id}
              title={product.title}
              imageUrl={imageUrl}  
              description={product.description}
              currency={product.price ? `$${product.price}` : "Precio no disponible"}
              link={`/product/${product.id}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Product;
