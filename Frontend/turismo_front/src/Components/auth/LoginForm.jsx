import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const LoginForm = ({ mode }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    paternalSurname: "",
    maternalSurname: "",
    username: "",
    dni: "",
    newsletter: "NO",
    role: "USER",
    state: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "YES" : "NO") : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      if (mode === "login") {
        const loginData = {
          email: formData.email,
          password: formData.password
        };
        const response = await authService.login(loginData);
        if (response.token) {
          navigate("/");
        }
      } else {
        const response = await authService.register(formData);
        if (response.token) {
          navigate("/");
        }
      }
    } catch (err) {
      setError(mode === "login" ? 
        "Credenciales inválidas" : 
        "Error en el registro. Por favor, intente nuevamente."
      );
    }
  };

  

  return (
    <div className="form-block__input-wrapper">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className={`form-group form-group--${mode}`}>
          {mode === "login" ? (
            // Formulario de Login
            <>
              <input 
                className="form-group__input" 
                type="email" 
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <input 
                className="form-group__input" 
                type="password" 
                placeholder="Contraseña" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </>
          ) : (
            // Formulario de Registro (según RegisterRequestDTO)
            <>
              <input 
                className="form-group__input" 
                type="text" 
                placeholder="Nombre" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                className="form-group__input" 
                type="text" 
                placeholder="Apellido Paterno" 
                name="paternalSurname"
                value={formData.paternalSurname}
                onChange={handleChange}
                required 
              />
              <input 
                className="form-group__input" 
                type="text" 
                placeholder="Apellido Materno" 
                name="maternalSurname"
                value={formData.maternalSurname}
                onChange={handleChange}
                required 
              />
              <input 
                className="form-group__input" 
                type="text" 
                placeholder="Nombre de usuario" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required 
              />
              <input 
                className="form-group__input" 
                type="email" 
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <input 
                className="form-group__input" 
                type="password" 
                placeholder="Contraseña" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <input 
                className="form-group__input" 
                type="text" 
                placeholder="DNI" 
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required 
              />
              <div className="form-group__checkbox">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter === "YES"}
                  onChange={handleChange}
                />
                <label htmlFor="newsletter">Suscribirse al newsletter</label>
              </div>
              {/* Campos ocultos */}
              <input 
                type="hidden" 
                name="role" 
                value={formData.role} 
              />
              <input 
                type="hidden" 
                name="state" 
                value={formData.state} 
              />
            </>
          )}
          <button className="button" type="submit">
            {mode === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
