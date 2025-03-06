import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';  // Importar SweetAlert2
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";  // Importamos el contexto
import { registerUser } from "./registerUserForm"; // Añadir esta importación

const LoginForm = ({ mode }) => {
  const navigate = useNavigate();
  const { login } = useAuth();  // Obtenemos la función login del contexto
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
    state: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "YES" : "NO") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
        
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Registro Exitoso!',
          text: 'Usuario registrado correctamente',
          timer: 2000,
          showConfirmButton: false
        });

        // Limpiar el formulario
        setFormData({
          name: "",
          email: "",
          password: "",
          paternalSurname: "",
          maternalSurname: "",
          username: "",
          dni: "",
          newsletter: "NO",
          role: "USER",
          state: true,
        });

        // Opcional: cambiar al modo login después del registro
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // Luego intentamos hacer login con las credenciales
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        const responseLogin = await authService.login(loginData);
        if (responseLogin.token) {
          login(responseLogin.token);
          navigate("/");
        }
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Hubo un problema al procesar tu solicitud',
      });
      setError(err.message || "Error en el proceso");
    } finally {
      setLoading(false);
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
            </>
          )}
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Procesando..." : (mode === "login" ? "INICIAR SESIÓN" : "REGISTRARSE")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;