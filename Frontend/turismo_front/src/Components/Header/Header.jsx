import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import logo from "../../assets/Logo_Final.png";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
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

      <nav className={styles.navContainer}>
        <Link to="/products" className={styles.navLink}>Ver Paquetes</Link>
        
        {!isLoggedIn ? (
          <div className={styles.authLinks}>
            <Link to="/auth" className={styles.authLink}>Inicia Sesión</Link>
            <Link to="/auth" className={styles.authLink}>Regístrate</Link>
          </div>
        ) : (
          <div className={styles.userSection}>
            <div className={styles.welcomeMessage}>
              Bienvenido/a, {user?.username}
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
        )}
      </nav>

      <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {isLoggedIn && (
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileInitialAvatar}>{getUserInitial()}</div>
              <span>Hola, {user?.username}</span>
            </div>
          )}
          <Link to="/products" onClick={() => setMenuOpen(false)}>Ver Paquetes</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/auth" onClick={() => setMenuOpen(false)}>Inicia Sesión</Link>
              <Link to="/auth" onClick={() => setMenuOpen(false)}>Regístrate</Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Mi Perfil</Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)}>Configuración</Link>
              <button className={styles.logoutButton} onClick={() => { handleLogout(); setMenuOpen(false); }}>
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
