import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Header/Header.module.css";
import logo from "../../assets/Logo_Final.png";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Globe on Click" className={styles.logo} />
      </Link>

     
      <div className={styles.authButtons}>
        <Link to="/auth" className={styles.authLink}>Inicia Sesión</Link>
        <Link to="/auth" className={styles.authLink}>Regístrate</Link>
      </div>

      
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />} 
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/auth"  onClick={toggleMenu}>Inicia Sesión</Link>
          <Link to="/auth"  onClick={toggleMenu}>Regístrate</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
