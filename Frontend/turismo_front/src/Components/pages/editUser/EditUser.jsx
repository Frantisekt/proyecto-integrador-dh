import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./EditUser.module.css";
import getUserById from "../../services/getUserById";
import { updateUser } from "../../services/updateUser";
import { FaUserCog } from "react-icons/fa";

const adminOptions = [
    { name: "Registrar usuario", path: "/admin/users/register", icon: FaUserCog },
    { name: "Ver usuarios registrados", path: "/admin/users/list", icon: FaUserCog }
];

const EditUser = () => {
    const { id } = useParams();
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById.getUserById(id);
                setFormData(data);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cargar la información del usuario.",
                    icon: "error",
                    confirmButtonText: "Cerrar"
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(formData);
            if (updatedUser) {
                Swal.fire({
                    title: "¡Actualización exitosa!",
                    text: "Los datos del usuario han sido actualizados correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });
            } else {
                throw new Error("Error al actualizar usuario");
            }
        } catch (error) {
            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema al actualizar los datos.",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
        }
    };

    return (
        <div className={styles.adminContainer}>
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
            <div className={styles.content}>
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.cardsContainer}>
                        <h2 className={styles.formTitle}>Editar Usuario</h2>
                        <form onSubmit={handleSubmit} className={styles.formContainer}>
                            {[{ label: "Nombre", name: "name", type: "text" },
                            { label: "Primer apellido", name: "paternalSurname", type: "text" },
                            { label: "Segundo apellido", name: "maternalSurname", type: "text" },
                            { label: "Nombre de Usuario", name: "username", type: "text" },
                            { label: "Correo Electrónico", name: "email", type: "email" },
                            { label: "DNI", name: "dni", type: "text", disabled: true }].map(({ label, name, type, disabled }) => (
                                <div key={name} className="mb-3 text-start">
                                    <label className={`form-label ${styles.label}`}>{label}</label>
                                    <input type={type} className="form-control" name={name} value={formData[name]} onChange={handleChange} required disabled={disabled} />
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
                            </div>
                            <button type="submit" className={`btn btn-primary ${styles.btnSmall}`}>Actualizar Datos</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditUser;
