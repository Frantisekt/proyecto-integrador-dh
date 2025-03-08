import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({ username: decodedToken.sub, ...decodedToken });
          setIsLoggedIn(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUser({ username: decodedToken.sub, ...decodedToken });
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
