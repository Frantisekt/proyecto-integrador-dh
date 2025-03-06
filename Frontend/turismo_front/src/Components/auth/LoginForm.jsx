import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext"; // Importamos el contexto
import { registerUser } from "./registerUserForm"; // Añadir esta importación

const LoginForm = ({ mode }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    paternalSurname: "",
    maternalSurname: "",
    username: "",
    email: "",
    password: "",
    dni: "",
    newsletter: "NO",
    role: "USER",
    state: true,
  });

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "YES" : "NO") : value,
    }));
  };

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        const response = await authService.login(loginData);
        if (response.token) {
          login(response.token);
          navigate("/");
        }
      } else {
        // Primero registramos el usuario con registerUser
        await registerUser(formData);
        // Luego intentamos hacer login con las credenciales
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        const response = await authService.login(loginData);
        if (response.token) {
          login(response.token);
          navigate("/");
        }
      }
    } catch (err) {
      setError("Ocurrió un error, por favor intenta nuevamente.");
    }
  };

  return (
    <div className="form-block__input-wrapper">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className={`form-group form-group--${mode}`}>
          {mode === "login" ? (
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
            <>
              {/* Mapeo para evitar repetición de código */}
              {[
                { label: "Nombre", name: "name", type: "text" },
                { label: "Apellido Paterno", name: "paternalSurname", type: "text" },
                { label: "Apellido Materno", name: "maternalSurname", type: "text" },
                { label: "Nombre de usuario", name: "username", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Contraseña", name: "password", type: "password" },
                { label: "DNI", name: "dni", type: "text" },
              ].map(({ label, name, type }) => (
                <input
                  key={name}
                  className="form-group__input"
                  type={type}
                  placeholder={label}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              ))}

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
              <input type="hidden" name="role" value={formData.role} />
              <input type="hidden" name="state" value={formData.state} />
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
