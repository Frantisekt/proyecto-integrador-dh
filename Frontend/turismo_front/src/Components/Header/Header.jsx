"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import logo from "../../assets/Logo_Final.png"
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  // Simulate logged in state - replace with actual auth logic later
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // Simulate login/logout for testing
  const toggleLoginState = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false)
      setUser(null)
    } else {
      setIsLoggedIn(true)
      setUser({
        name: "Usuario",
        avatar: null, // Will use initial if no avatar
      })
    }
    // Close menus when toggling login state
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    // Close user menu if open
    if (userMenuOpen) setUserMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setUserMenuOpen(false)
  }

  
  const getUserInitial = () => {
    if (!user || !user.name) return "U"
    return user.name.charAt(0).toUpperCase()
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo || "/placeholder.svg"} alt="Globe on Click" className={styles.logo} />
      </Link>

      {isLoggedIn ? (
        <div className={styles.userSection}>
          <div className={styles.welcomeMessage}>
            Bienvenido/a, {user?.name}
            <button
              className={styles.chevronButton}
              onClick={toggleUserMenu}
              aria-label={userMenuOpen ? "Cerrar menú de usuario" : "Abrir menú de usuario"}
            >
              {userMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          <div className={styles.avatarContainer} onClick={toggleUserMenu}>
            {user?.avatar ? (
              <img src={user.avatar || "/placeholder.svg"} alt="Avatar de usuario" className={styles.avatar} />
            ) : (
              <div className={styles.initialAvatar}>{getUserInitial()}</div>
            )}
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

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {isLoggedIn ? (
            <>
              <div className={styles.mobileUserInfo}>
                <div className={styles.mobileInitialAvatar}>{getUserInitial()}</div>
                <span>{user?.name}</span>
              </div>
              <Link to="/profile" onClick={toggleMenu}>
                Mi Perfil
              </Link>
              <Link to="/settings" onClick={toggleMenu}>
                Configuración
              </Link>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" onClick={toggleMenu}>
                Inicia Sesión
              </Link>
              <Link to="/auth" onClick={toggleMenu}>
                Regístrate
              </Link>
            </>
          )}
          {/* Toggle button for demo purposes - remove in production */}
          <button className={styles.demoToggle} onClick={toggleLoginState}>
            {isLoggedIn ? "Simular Logout" : "Simular Login"}
          </button>
        </div>
      )}

      {/* Toggle button for demo purposes - remove in production */}
      <button className={styles.demoToggleDesktop} onClick={toggleLoginState}>
        {isLoggedIn ? "Simular Logout" : "Simular Login"}
      </button>
    </header>
  )
}

export default Header;

