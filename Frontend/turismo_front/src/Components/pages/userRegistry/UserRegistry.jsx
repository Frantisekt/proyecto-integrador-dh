import React, { useState } from "react";
import { registerUser } from "../../services/registerUser";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./UserRegistry.module.css";
import { FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const adminOptions = [
    { name: "Registrar usuario", path: "/admin/users/register", icon: FaUserCog },
    { name: "Ver usuarios registrados", path: "/admin/users/list", icon: FaUserCog }
];

const UserRegistry = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: "",
        paternalSurname: "",
        maternalSurname: "",
        username: "",
        email: "",
        password: "",
        dni: "",
        newsletter: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateFormData(formData);
        if (!validation.valid) {
            return Swal.fire("Error", validation.message, "error");
        }
        try {
            await registerUser(formData);

            // ✅ Mostrar mensaje con SweetAlert
            Swal.fire({
                title: "¡Registro exitoso!",
                text: "El usuario ha sido registrado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });

            // Limpiar el formulario después de registrar
            setFormData({
                name: "",
                paternalSurname: "",
                maternalSurname: "",
                username: "",
                email: "",
                password: "",
                dni: "",
                newsletter: "NO",
                role: "USER",
            });

            setTimeout(() => {
                navigate("/admin/users");
            }, 1500);

        } catch {
            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema al registrar el usuario.",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
        }
    };

    const validateFormData = (data) => {
        if (data.name.trim().length < 3) return { valid: false, message: "El nombre debe tener al menos 3 caracteres." };
        if (data.paternalSurname.trim().length < 3) return { valid: false, message: "El primer apellido debe tener al menos 3 caracteres." };
        if (data.maternalSurname.trim().length < 3) return { valid: false, message: "El segundo apellido debe tener al menos 3 caracteres." };
        if (!/^\S+@\S+\.\S+$/.test(data.email)) return { valid: false, message: "Correo electrónico no válido." };
        if (data.password.length < 6) return { valid: false, message: "La contraseña debe tener al menos 6 caracteres." };
        if (!/^\d{7,9}$/.test(data.dni)) return { valid: false, message: "El DNI debe ser un número de 7 a 9 dígitos." };

        return { valid: true };
    };

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <div className={styles.sideBar}>
                <ul>
                    {adminOptions.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                            <li key={index}>
                                <Link to={option.path}>
                                    <span className={styles.icon}><IconComponent /></span>
                                    {option.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Contenido principal con el formulario */}
            <div className={styles.content}>
                <div className={styles.cardsContainer}>
                    <h2 className={styles.formTitle}>Registro de Usuario</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
                        {[
                            { label: "Nombre", name: "name", type: "text" },
                            { label: "Primer apellido", name: "paternalSurname", type: "text" },
                            { label: "Segundo apellido", name: "maternalSurname", type: "text" },
                            { label: "Nombre de Usuario", name: "username", type: "text" },
                            { label: "Correo Electrónico", name: "email", type: "email" },
                            { label: "Contraseña", name: "password", type: "password" },
                            { label: "DNI", name: "dni", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="mb-3 text-start">
                                <label className={`form-label ${styles.label}`}>{label}</label>
                                <input type={type} className="form-control" name={name} value={formData[name]} onChange={handleChange} required />
                            </div>
                        ))}

                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}>Suscribirse al boletín</label>
                            <select className="form-select" name="newsletter" value={formData.newsletter} onChange={handleChange}>
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}>Rol</label>
                            <select className="form-select" name="role" value={formData.role} onChange={handleChange} required>
                                <option value="USER">Usuario</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="AGENT">Agente</option>
                            </select>
                        </div >
                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/users')}
                                className={`${styles.btnRegresar} ${styles.btnSmall}`}
                            >
                                Regresar
                            </button>
                            <button
                                type="submit"
                                className={`${styles.btnPrimary} ${styles.btnSmall}`}
                            >
                                Registrar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegistry;
