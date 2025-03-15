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
    const validationError = validateForm(formData, mode);
    if (validationError) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incorrectos',
        text: validationError,
      });
      setLoading(false);
      return;
    }
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
        // Registro de usuario
        try {
          // Primero registramos el usuario
          const registrationResponse = await registerUser(formData);
          
          // Mostrar mensaje de éxito
          await Swal.fire({
            icon: 'success',
            title: '¡Registro Exitoso!',
            text: 'Usuario registrado correctamente',
            timer: 2000,
            showConfirmButton: false
          });

          // Intentar hacer login automáticamente
          const loginData = {
            email: formData.email,
            password: formData.password,
          };
          
          const loginResponse = await authService.login(loginData);
          if (loginResponse.token) {
            login(loginResponse.token);
            
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

            navigate("/");
          }
        } catch (registrationError) {
          console.error('Error en el registro:', registrationError);
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: registrationError.message || 'Hubo un problema al registrar el usuario',
            confirmButtonText: 'Entendido'
          });
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Hubo un problema al procesar tu solicitud',
        confirmButtonText: 'Entendido'
      });
      setError(err.message || "Error en el proceso");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (data, mode) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const dniRegex = /^[0-9]{8}$/; // DNI de 8 dígitos
  
    // Validaciones para LOGIN
    if (mode === "login") {
      if (!emailRegex.test(data.email)) return "El correo electrónico no es válido.";
      if (!data.password.trim()) return "La contraseña es obligatoria.";
      return null;
    }
  
    // Validaciones para REGISTRO
    if (!data.name.trim()) return "El nombre es obligatorio.";
    if (!data.paternalSurname.trim()) return "El apellido paterno es obligatorio.";
    if (!data.maternalSurname.trim()) return "El apellido materno es obligatorio.";
    if (!data.username.trim()) return "El nombre de usuario es obligatorio.";
    if (!emailRegex.test(data.email)) return "El correo electrónico no es válido.";
    if (!passwordRegex.test(data.password)) return "La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo.";
    if (!dniRegex.test(data.dni)) return "El DNI debe contener 8 dígitos numéricos.";
  
    return null; // Si todo está correcto, no hay error
  };
  

  return (
    <div className="form-block__input-wrapper">
      <form onSubmit={handleSubmit} noValidate>
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