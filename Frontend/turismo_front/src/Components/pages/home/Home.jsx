import React from "react";
import Hero from "../../Hero/Hero"; 
import Categories from "../../Categories/Categories";
import styles from "./Home.module.css"; 

const Home = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <Categories />
    </div>
  );
};

export default Home;
