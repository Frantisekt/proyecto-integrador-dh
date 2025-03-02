import React, { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import "./Auth.scss";
import Logo from "../../assets/Logo_Final.png";

const LoginComponent = () => {
  const [mode, setMode] = useState("login");

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  

  return (
    <div className="app">
      <div className="form-block">
        <div className="container">
          <img src={Logo} alt="Globe on Click" className="logo" />
          <h1>{mode === "login" ? "Bienvenido!" : "Crear cuenta"}</h1>
        </div>
        <div className="form-block__toggle-block">
          <span>
            {mode === "login" ? (
              <>¿No tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>Click aquí</a></>
            ) : (
              <>¿Ya tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>Click aquí</a></>
            )}
          </span>
        </div>
        <LoginForm mode={mode} />
      </div>
    </div>
  );
};

export default LoginComponent;



