import { Link } from "react-router-dom";
import styles from "../Header/Header.module.css"; 
import logo from "../../assets/Logo_Final.png"; // Ajusta la ruta según la estructura


const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
      <img src={logo} alt="Globe on Click" className={styles.logo} />
      </Link>

      <div className={styles.authButtons}>
        <Link to="/login" className={styles.authLink}>Log In</Link>
        <Link to="/signup" className={styles.authLink}>Crear cuenta</Link>
      </div>
    </header>
  );
};

export default Header;
