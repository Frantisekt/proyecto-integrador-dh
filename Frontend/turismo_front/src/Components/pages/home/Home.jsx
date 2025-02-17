import React from "react";
import Hero from "../../Hero/Hero"; 
import Categories from "../../Categories/Categories";
import { Recommendations } from "../../Recomendations/Recomendations";
import styles from "./Home.module.css"; 

const Home = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <Categories />
      <Recommendations />
    </div>
  );
};

export default Home;
