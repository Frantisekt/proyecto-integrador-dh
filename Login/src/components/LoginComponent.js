import React, { useState } from "react";
import LoginForm from "./LoginForm";

const LoginComponent = () => {
  const [mode, setMode] = useState("login");

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <div>
      <div className={`form-block-wrapper form-block-wrapper--is-${mode}`}></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
        <div className="container">
            <img src="/img/Logo.png" alt="Logo" className="logo" />
            <h1 id="text">
            {mode === "login" ? "Bienvenido!" : "Crear cuenta"}</h1>
            </div>
          <div className="form-block__toggle-block">
            <span>{mode === "login" ? "No" : "Ya"} tienes una cuenta? Click Aquí →</span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm mode={mode} />
      </section>
    </div>
  );
};

export default LoginComponent;
