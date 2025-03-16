import React from "react";
import AdminLoginForm from "./AdminLoginForm.jsx";
import "./AdminLoginComponent.css";
import Logo from "../../assets/Logo_Final.png";

const AdminLoginComponent = () => {
  return (
    <div className="app">
      {/* Mensaje para dispositivos móviles */}
      <div className="mobileMessage">
        <h2>Acceso no disponible</h2>
        <p>El panel de administración solo está disponible para dispositivos de escritorio. Por favor, accede desde una computadora.</p>
      </div>

      {/* Contenido para escritorio */}
      <div className="admin-form-block">
        <div className="container">
          <img src={Logo} alt="Globe on Click" className="logo" />
          <h1>Acceso Administrador</h1>
        </div>
        <AdminLoginForm mode="login" />
      </div>
    </div>
  );
};

export default AdminLoginComponent;