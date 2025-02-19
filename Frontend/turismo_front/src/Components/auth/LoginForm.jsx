import React, { useState } from "react";
import Input from "./Input";

const LoginForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
    createpassword: '',
    repeatpassword: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (mode === 'signup') {
      // Validar que las contraseñas coincidan
      if (formData.createpassword !== formData.repeatpassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      // Validar que el nombre completo no esté vacío
      if (!formData.fullname.trim()) {
        setError('Por favor ingrese su nombre completo');
        return;
      }
    }

    setError('');
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error cuando el usuario empiece a escribir
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-block__input-wrapper">
        {/* Formulario de Login */}
        <div className={`form-group form-group--login ${mode === 'signup' ? 'hidden' : ''}`}>
          <Input 
            type="text" 
            id="username" 
            label="Nombre de usuario" 
            disabled={mode === "signup"}
            onChange={handleChange}
            value={formData.username}
          />
          <Input 
            type="password" 
            id="password" 
            label="Contraseña" 
            disabled={mode === "signup"}
            onChange={handleChange}
            value={formData.password}
          />
        </div>

        {/* Formulario de Registro */}
        <div className={`form-group form-group--signup ${mode === 'login' ? 'hidden' : ''}`}>
          <Input 
            type="text" 
            id="fullname" 
            label="Nombre completo" 
            disabled={mode === "login"}
            onChange={handleChange}
            value={formData.fullname}
            required={mode === "signup"}
          />
          <Input 
            type="email" 
            id="email" 
            label="Email" 
            disabled={mode === "login"}
            onChange={handleChange}
            value={formData.email}
            required={mode === "signup"}
          />
          <Input 
            type="password" 
            id="createpassword" 
            label="Contraseña" 
            disabled={mode === "login"}
            onChange={handleChange}
            value={formData.createpassword}
            required={mode === "signup"}
          />
          <Input 
            type="password" 
            id="repeatpassword" 
            label="Repetir contraseña" 
            disabled={mode === "login"}
            onChange={handleChange}
            value={formData.repeatpassword}
            required={mode === "signup"}
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </button>
    </form>
  );
};

export default LoginForm; 