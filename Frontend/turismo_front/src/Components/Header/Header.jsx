import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Importa el contexto
import styles from "./Header.module.css";
import logo from "../../assets/Logo_Final.png";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth(); // Obtiene datos del contexto
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const getUserInitial = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo || "/placeholder.svg"} alt="Globe on Click" className={styles.logo} />
      </Link>

      {isLoggedIn ? (
        <div className={styles.userSection}>
          <div className={styles.welcomeMessage}>
            Bienvenido/a, {user?.username} {/* Ahora usa el contexto */}
            <button className={styles.chevronButton} onClick={toggleUserMenu}>
              {userMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          <div className={styles.avatarContainer} onClick={toggleUserMenu}>
            <div className={styles.initialAvatar}>{getUserInitial()}</div>
          </div>

          {userMenuOpen && (
            <div className={styles.userMenu}>
              <Link to="/profile" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                <FaUser className={styles.menuIcon} />
                <span>Mi Perfil</span>
              </Link>
              <Link to="/settings" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                <FaCog className={styles.menuIcon} />
                <span>Configuración</span>
              </Link>
              <button className={styles.userMenuItem} onClick={handleLogout}>
                <FaSignOutAlt className={styles.menuIcon} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/auth" className={styles.authLink}>
            Inicia Sesión
          </Link>
          <Link to="/auth" className={styles.authLink}>
            Regístrate
          </Link>
        </div>
      )}

      <div className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
