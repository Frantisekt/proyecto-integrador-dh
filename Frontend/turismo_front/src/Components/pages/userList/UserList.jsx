import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserList.module.css";
import { FaUserCog, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const adminOptions = [
    { name: "Registrar usuario", path: "/admin/users/register", icon: FaUserCog },
    { name: "Ver usuarios registrados", path: "/admin/users/list", icon: FaUserCog }
];

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8087/api/v1/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error al cargar usuarios:", error));
    }, []);

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <div className={styles.sideBar}>
                <ul>
                    {adminOptions.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                            <li key={index}>
                                <Link to={option.path} className="d-flex align-items-center">
                                    <span className={styles.icon}><IconComponent /></span>
                                    {option.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Contenido principal */}
            <div className={styles.content}>
                <div className="mb-3">
                    <h2 className="text-dark fw-bold text-center">Lista de Usuarios</h2>
                </div>

                <div className={styles.tableContainer}>
                    <table className={`${styles.table} table table-hover table-striped align-middle`}>
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>DNI</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user.userId}>
                                        <td>{`${user.name} ${user.paternalSurname} ${user.maternalSurname}`}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.dni}</td>
                                        <td>
                                            <span className="badge" style={{ backgroundColor: user.role === "ADMIN" ? "#FF851B" : "#28C76F", color: "#fff" }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary btn-sm me-2">
                                                <FaEdit /> Editar
                                            </button>
                                            <button className="btn btn-danger btn-sm">
                                                <FaTrash /> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No hay usuarios registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;
