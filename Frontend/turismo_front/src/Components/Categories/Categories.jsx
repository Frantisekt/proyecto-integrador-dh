"use client"

import { useState } from "react"
import styles from "./Categories.module.css"
import TravelCard from "../TravelCard/TravelCard"

const categoriesData = [
  {
    id: 1,
    title: "Paquete VIP",
    price: 149.0,
    imageUrl: "https://places2explore.wordpress.com/wp-content/uploads/2011/06/brussels-gp-hdr-01.jpg?w=900&h=597",
    href: "/packages/vip",
    type: "featured",
  },
  {
    id: 2,
    title: "Paquete económico",
    price: 99.0,
    imageUrl: "https://i.pinimg.com/736x/4e/d0/e0/4ed0e0de1ef9bd790c28027baf46c0b7.jpg",
    href: "/packages/economic",
    type: "bestseller",
  },
  {
    id: 3,
    title: "Paquete Business",
    price: 89.0,
    imageUrl: "https://i.pinimg.com/736x/df/f8/a9/dff8a9cb71a0e89d88eae5874f67997b.jpg",
    href: "/packages/business",
    type: "featured",
  },
  {
    id: 4,
    title: "Paquete romántico",
    price: 89.0,
    imageUrl: "https://i.pinimg.com/736x/be/e4/d2/bee4d274242e6abfce5c11119ce090ac.jpg",
    href: "/packages/romantic",
    type: "standard",
  },
  {
    id: 5,
    title: "Tours",
    price: 109.0,
    imageUrl: "https://i.pinimg.com/736x/6b/8b/05/6b8b0507d4a0ada68150631eff6d4e85.jpg",
    href: "/tours",
    type: "bestseller",
  },
]

const Categories = () => {
  const [activeFilter, setActiveFilter] = useState("all")

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const filteredCategories =
    activeFilter === "all" ? categoriesData : categoriesData.filter((category) => category.type === activeFilter)

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.titleLine}></div>
          <h2 className={styles.title}>Categorías</h2>
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${activeFilter === "all" ? styles.activeFilter : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === "featured" ? styles.activeFilter : ""}`}
            onClick={() => handleFilterChange("featured")}
          >
            Featured
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === "bestseller" ? styles.activeFilter : ""}`}
            onClick={() => handleFilterChange("bestseller")}
          >
            Best Seller
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredCategories.map((category) => (
          <TravelCard key={category.id} {...category} className={styles[`card${category.id}`]} />
        ))}
      </div>
    </section>
  )
}

export default Categories;

