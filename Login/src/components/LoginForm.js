import React from "react";
import Input from "./Input";

const LoginForm = ({ mode }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <Input type="text" id="username" label="Nombre de usuario" disabled={mode === "signup"} />
          <Input type="password" id="password" label="Contraseña" disabled={mode === "signup"} />
        </div>
        <div className="form-group form-group--signup">
          <Input type="text" id="fullname" label="Nombre completo" disabled={mode === "login"} />
          <Input type="email" id="email" label="Email" disabled={mode === "login"} />
          <Input type="password" id="createpassword" label="Contraseña" disabled={mode === "login"} />
          <Input type="password" id="repeatpassword" label="Repetir contraseña" disabled={mode === "login"} />
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </button>
    </form>
  );
};

export default LoginForm;
