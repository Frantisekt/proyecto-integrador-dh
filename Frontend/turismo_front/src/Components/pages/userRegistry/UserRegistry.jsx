import React, { useState } from "react";
import { registerUser } from "../../services/registerUser";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; 
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./UserRegistry.module.css";
import { FaUserCog } from "react-icons/fa";

const adminOptions = [
    { name: "Registrar usuario", path: "/admin/users/register", icon: FaUserCog },
    { name: "Ver usuarios registrados", path: "/admin/users/list", icon: FaUserCog }
];

const UserRegistry = () => {
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        } catch {
            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema al registrar el usuario.",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
        }
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
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
                            </select>
                        </div>
                        <button type="submit" className={`btn btn-primary ${styles.btnSmall}`}>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegistry;
