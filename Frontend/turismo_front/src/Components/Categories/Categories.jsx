"use client";

import { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import TravelCard from "../TravelCard/TravelCard";
import { obtenerCategorias } from "../../services/categoryServices";

const Categories = () => {
  const [categorias, setCategorias] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const cargarCategorias = async () => {
      const datos = await obtenerCategorias();

      const transformados = datos.map((cat) => {

        const imageUrl =
          cat.mediaCategories && cat.mediaCategories.length > 0
            ? cat.mediaCategories[0].mediaUrl
            : "https://via.placeholder.com/150";

        return {
          id: cat.categoryId,
          title: cat.title,
          price: cat.price || 0,
          imageUrl,
          href: `/packages/${cat.categoryId}`,

          type: cat.discount && cat.discount > 0 ? "featured" : "standard",
        };
      });
      setCategorias(transformados);
    };
    cargarCategorias();
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  let filteredCategories = [];
  if (activeFilter === "all") {
    filteredCategories = categorias;
  } else if (activeFilter === "featured") {

    const featuredKeywords = ["business", "vip", "best seller", "romántico"];
    filteredCategories = categorias.filter((category) =>
      featuredKeywords.some((keyword) =>
        category.title.toLowerCase().includes(keyword)
      )
    );
  } else if (activeFilter === "bestseller") {

    const bestsellerKeywords = ["best seller", "estandar", "vip", "tours"];
    filteredCategories = categorias.filter((category) =>
      bestsellerKeywords.some((keyword) =>
        category.title.toLowerCase().includes(keyword)
      )
    );
  }

  return (
    <section className={styles.container}>
      {/* CABECERA */}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.titleLine}></div>
          <h2 className={styles.title}>Categorías</h2>
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${
              activeFilter === "all" ? styles.activeFilter : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${
              activeFilter === "featured" ? styles.activeFilter : ""
            }`}
            onClick={() => handleFilterChange("featured")}
          >
            Featured
          </button>
          <button
            className={`${styles.filterButton} ${
              activeFilter === "bestseller" ? styles.activeFilter : ""
            }`}
            onClick={() => handleFilterChange("bestseller")}
          >
            Best Seller
          </button>
        </div>
      </div>

     
      <div className={styles.grid}>
        {filteredCategories.map((category, index) => {
         
          let cardClass = "";
          switch (index) {
            case 0:
              cardClass = styles.card1;
              break;
            case 1:
              cardClass = styles.card2;
              break;
            case 2:
              cardClass = styles.card3;
              break;
            case 3:
              cardClass = styles.card4;
              break;
            case 4:
              cardClass = styles.card5;
              break;
            default:
              cardClass = styles.card5;
          }

          return (
            <TravelCard
              key={category.id}
              title={category.title}
              price={category.price}
              imageUrl={category.imageUrl}
              href={category.href}
              type={category.type}
              className={cardClass}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
