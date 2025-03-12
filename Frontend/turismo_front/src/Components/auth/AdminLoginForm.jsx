import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Swal from "sweetalert2";

const AdminLoginForm = ({ mode }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    
    try {
      const response = await authService.adminLogin(formData);
      
      if (response.role !== 'ADMIN') {
        throw new Error('Acceso denegado: No tienes permisos de administrador');
      }

      // Guardar datos del admin y token
      localStorage.setItem('adminData', JSON.stringify(response));
      localStorage.setItem('isAdminLoggedIn', 'true');

      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Has iniciado sesión como administrador`,
        timer: 2000,
        showConfirmButton: false
      });

      navigate("/admin");
    } catch (err) {
      console.error('Error de login:', err);
      setError(err.message || "Credenciales inválidas");
      Swal.fire({
        icon: 'error',
        title: 'Error de acceso',
        text: err.message || 'Credenciales inválidas',
      });
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
          <input 
            className="form-group__input" 
            type="password" 
            placeholder="Contraseña" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
            disabled={loading}
          />
          <button 
            className="button" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'INICIANDO SESIÓN...' : 'INICIAR SESIÓN COMO ADMINISTRADOR'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
