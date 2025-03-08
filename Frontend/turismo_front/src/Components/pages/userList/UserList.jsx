import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserList.module.css";
import { FaUserCog, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers } from "../../services/getUsers";
import { deleteUser } from "../../services/deleteUser";
import Swal from "sweetalert2";

const adminOptions = [
    { name: "Registrar usuario", path: "/admin/users/register", icon: FaUserCog },
    { name: "Ver usuarios registrados", path: "/admin/users/list", icon: FaUserCog }
];

const getRoleBadgeColor = (role) => {
    switch (role) {
        case "ADMIN":
            return "#FF851B";
        case "AGENT":
            return "#7367F0";
        case "USER":
            return "#28C76F";
        default:
            return "#6C757D";
    }
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            // Asegurarse de que los roles estén en mayúsculas
            const formattedData = data.map(user => ({
                ...user,
                role: user.role?.toUpperCase() || "USER"
            }));
            setUsers(formattedData);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los usuarios",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirmDelete.isConfirmed) {
            try {
                await deleteUser(userId);
                await fetchUsers(); // Recargar la lista después de eliminar
                Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
            }
        }
    };

    const handleEditUser = (userId) => {
        navigate(`/admin/users/edit/${userId}`);
    };

    return (
        <div className={styles.adminContainer}>
            <div className={styles.sideBar}>
                <ul>
                    {adminOptions.map((option, index) => (
                        <li key={index}>
                            <Link to={option.path} className="d-flex align-items-center">
                                <span className={styles.icon}><option.icon /></span>
                                {option.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.content}>
                <div className="mb-3">
                    <h2 className="text-dark fw-bold text-center">Lista de Usuarios</h2>
                </div>

                <div className={styles.tableContainer}>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
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
                                {users.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{`${user.name} ${user.paternalSurname} ${user.maternalSurname}`}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.dni}</td>
                                        <td>
                                            <span 
                                                className="badge" 
                                                style={{ 
                                                    backgroundColor: getRoleBadgeColor(user.role),
                                                    color: "#fff",
                                                    padding: "8px 12px"
                                                }}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-primary btn-sm me-2" 
                                                onClick={() => handleEditUser(user.userId)}
                                            >
                                                <FaEdit /> Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm" 
                                                onClick={() => handleDeleteUser(user.userId)}
                                            >
                                                <FaTrash /> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserList;
