import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaList, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import styles from "./CategoryList.module.css";
import getAllCategories from "../../services/getAllCategories";
import deleteCategory from "../../services/deleteCategory";
import "bootstrap/dist/css/bootstrap.min.css";

const adminOptions = [
    {
        name: "Agregar nueva categoría",
        path: "/admin/categories/add",
        icon: FaPlusCircle
    },
    {
        name: "Ver categorías registradas",
        path: "/admin/categories/list",
        icon: FaList
    }
];

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
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
            const result = await deleteCategory(categoryId);
            if (result.success) {
                Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
                fetchCategories(); // Actualizar la lista después de eliminar
            } else {
                Swal.fire("Error", "No se pudo eliminar la categoría.", "error");
            }
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
                <div className="mb-3">
                    <h2 className="text-dark fw-bold text-center">Lista de Categorías</h2>
                </div>

                <div className={styles.tableContainer}>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2">Cargando categorías...</p>
                        </div>
                    ) : (
                        <table className={`${styles.table} table table-hover table-striped align-middle`}>
                            <thead className="table-dark">
                                <tr>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Moneda</th>
                                    <th>Restricciones</th>
                                    <th>Estado</th>
                                    <th>Descuento</th>
                                    <th>Paquetes</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr key={category.categoryId}>
                                            <td>{category.title}</td>
                                            <td>{category.description}</td>
                                            <td>{category.price.toFixed(2)}</td>
                                            <td>{category.currency}</td>
                                            <td>{category.restrictions || "N/A"}</td>
                                            <td>
                                                <span className={`badge ${category.state ? "bg-success" : "bg-danger"}`}>
                                                    {category.state ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td>{category.discount}%</td>
                                            <td>
                                                {category.tourPackages.length > 0 ? (
                                                    category.tourPackages.map(pkg => (
                                                        <span key={pkg.packageId} className="badge bg-info me-1">
                                                            {pkg.title}
                                                        </span>
                                                    ))
                                                ) : (
                                                    "Sin paquetes"
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link to={`/admin/categories/edit/${category.categoryId}`} className="btn btn-primary btn-sm">
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteCategory(category.categoryId)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">No hay categorías registradas.</td>
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

export default CategoryList;
