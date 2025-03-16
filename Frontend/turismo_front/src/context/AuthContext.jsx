"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminData, setAdminData] = useState(null)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  // Cargar datos del usuario y admin al iniciar
  useEffect(() => {
    const loadUserData = () => {
      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken)
          if (decodedToken.exp * 1000 > Date.now()) {
            setUser({ username: decodedToken.sub, ...decodedToken })
            setIsLoggedIn(true)
          } else {
            logout()
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error)
          logout()
        }
      }
    }

    const loadAdminData = () => {
      const storedAdminData = localStorage.getItem("adminData")
      if (storedAdminData) {
        try {
          setAdminData(JSON.parse(storedAdminData))
          setIsAdminLoggedIn(true)
        } catch (error) {
          console.error("Error al cargar datos de admin:", error)
          setAdminData(null)
          setIsAdminLoggedIn(false)
          localStorage.removeItem("adminData")
        }
      }
    }

    loadUserData()
    loadAdminData()
  }, [])

  // Actualizar el estado cuando se cambian los datos del admin en otra pestaña
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "adminData") {
        if (event.newValue) {
          try {
            const adminData = JSON.parse(event.newValue)
            setAdminData(adminData)
            setIsAdminLoggedIn(true)
          } catch (error) {
            console.error("Error al procesar datos de admin:", error)
          }
        } else {
          setAdminData(null)
          setIsAdminLoggedIn(false)
        }
      } else if (event.key === "token") {
        if (event.newValue) {
          try {
            const decodedToken = jwtDecode(event.newValue)
            setUser({ username: decodedToken.sub, ...decodedToken })
            setIsLoggedIn(true)
          } catch (error) {
            console.error("Error al decodificar el token:", error)
          }
        } else {
          setUser(null)
          setIsLoggedIn(false)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token)
      setUser({ username: decodedToken.sub, ...decodedToken })
      setIsLoggedIn(true)
      localStorage.setItem("token", token)
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
    }
  }

  const adminLogin = (adminData) => {
    try {
      setAdminData(adminData)
      setIsAdminLoggedIn(true)
      localStorage.setItem("adminData", JSON.stringify(adminData))
    } catch (error) {
      console.error("Error al iniciar sesión de admin:", error)
    }
  }

  const logout = (shouldReload = false) => {
    setUser(null)
    setIsLoggedIn(false)
    setAdminData(null)
    setIsAdminLoggedIn(false)
    localStorage.removeItem("token")
    localStorage.removeItem("adminData")
  
    if (shouldReload) {
      window.location.reload() 
    }
  }
  

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        adminData,
        isAdminLoggedIn,
        login,
        adminLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

