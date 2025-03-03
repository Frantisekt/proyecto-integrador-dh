import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserList.module.css";
import { FaUserCog, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers } from "../../services/getUsers";

const adminOptions = [
    { name: "Registrar usuario", path: "/admin/users/register", icon: FaUserCog },
    { name: "Ver usuarios registrados", path: "/admin/users/list", icon: FaUserCog }
];

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchUsers();
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

            <div className={styles.content}>
                <div className="mb-3">
                    <h2 className="text-dark fw-bold text-center">Lista de Usuarios</h2>
                </div>

                <div className={styles.tableContainer}>
                    {loading ? (
                        // 🔄 Spinner de carga
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2">Cargando usuarios...</p>
                        </div>
                    ) : (
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
                                    users.map((user) => (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserList;
