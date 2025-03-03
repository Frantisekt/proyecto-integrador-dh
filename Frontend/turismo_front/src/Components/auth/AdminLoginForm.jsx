import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const AdminLoginForm = ({ mode }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const loginData = {
        email: formData.email,
        password: formData.password
      };
      const response = await authService.adminLogin(loginData);
      if (response.token) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="form-block__input-wrapper">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group form-group--admin">
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
          <button className="button" type="submit">
            INICIAR SESIÓN COMO ADMINISTRADOR
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
