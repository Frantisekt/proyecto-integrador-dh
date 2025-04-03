"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import styles from "./Header.module.css"
import logo from "../../assets/Logo_Final.png"
import { 
  FaBars, FaTimes, FaChevronDown, FaChevronUp, 
  FaUser, FaCog, FaSignOutAlt, FaUserShield, FaHeart, FaSuitcase 
} from "react-icons/fa"

const Header = () => {
  const { user, isLoggedIn, adminData, isAdminLoggedIn, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({ name: "", isAdmin: false })

  // Update current user whenever auth state changes
  useEffect(() => {
    if (isAdminLoggedIn && adminData) {
      setCurrentUser({
        name: adminData.name || "Admin",
        isAdmin: true,
      })
    } else if (isLoggedIn && user) {
      setCurrentUser({
        name: user.username || "Usuario",
        isAdmin: false,
      })
    } else {
      setCurrentUser({ name: "", isAdmin: false })
    }
  }, [isLoggedIn, isAdminLoggedIn, user, adminData])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    if (userMenuOpen) setUserMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const handleLogout = () => {
    const isAdminPage = location.pathname.startsWith('/admin');
    logout(isAdminPage); 
    setUserMenuOpen(false);
  };

  const getUserInitial = () => {
    return currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo || "/placeholder.svg"} alt="Globe on Click" className={styles.logo} />
      </Link>

      <nav className={styles.navContainer}>
        <Link to="/products" className={styles.navLink}>
          Ver Paquetes
        </Link>

        {!isLoggedIn && !isAdminLoggedIn ? (
          <div className={styles.authLinks}>
            <Link to="/auth" className={styles.authLink}>
              Inicia Sesión / Regístrate
            </Link>

          </div>
        ) : (
          <div className={styles.userSection}>
            <div className={styles.welcomeMessage}>
              {currentUser.isAdmin ? <span className={styles.adminBadge}>Admin: </span> : "Bienvenido/a, "}
              {currentUser.name}
              <button className={styles.chevronButton} onClick={toggleUserMenu}>
                {userMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            <div className={styles.avatarContainer} onClick={toggleUserMenu}>
              <div className={`${styles.initialAvatar} ${currentUser.isAdmin ? styles.adminAvatar : ""}`}>
                {getUserInitial()}
              </div>
            </div>

            {userMenuOpen && (
              <div className={styles.userMenu}>
                {currentUser.isAdmin ? (
                  <Link to="/admin/dashboard" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                    <FaUserShield className={styles.menuIcon} />
                    <span>Panel de Admin</span>
                  </Link>
                ) : (
                  <>
                    <Link to="/profile" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                      <FaUser className={styles.menuIcon} />
                      <span>Mi Perfil</span>
                    </Link>
                    <Link to="/favorites" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                      <FaHeart className={styles.menuIcon} />
                      <span>Favoritos</span>
                    </Link>

                    <Link to="/mis-reservaciones" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                      <FaSuitcase className={styles.menuIcon} />
                      <span>Mis Reservas</span>
                    </Link>
                  </>
                )}
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
          {(isLoggedIn || isAdminLoggedIn) && (
            <div className={styles.mobileUserInfo}>
              <div className={`${styles.mobileInitialAvatar} ${currentUser.isAdmin ? styles.adminAvatar : ""}`}>
                {getUserInitial()}
              </div>
              <span>
                {currentUser.isAdmin ? "Admin: " : "Hola, "}
                {currentUser.name}
              </span>
            </div>
          )}
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Ver Paquetes
          </Link>
          {!isLoggedIn && !isAdminLoggedIn ? (
            <>
              <Link to="/auth" onClick={() => setMenuOpen(false)}>
                Inicia Sesión
              </Link>
              <Link to="/auth" onClick={() => setMenuOpen(false)}>
                Regístrate
              </Link>
            </>
          ) : (
            <>
              {currentUser.isAdmin ? (
                <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                  Panel de Admin
                </Link>
              ) : (
                <>
                  <Link to="/favorites" onClick={() => setMenuOpen(false)}>
                    Favoritos
                  </Link>
                  <Link to="/mis-reservaciones" onClick={() => setMenuOpen(false)}>
                    <FaSuitcase className={styles.menuIcon} />
                    Mis Reservas
                  </Link>
                </>
              )}
              <button
                className={styles.logoutButton}
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
