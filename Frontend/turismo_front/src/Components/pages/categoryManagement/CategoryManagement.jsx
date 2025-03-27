import { Link } from "react-router-dom";
import styles from "./CategoryManagement.module.css";
import { FaPlusCircle, FaList } from "react-icons/fa";
import { FaUserCog, FaPlane, FaTags } from "react-icons/fa";
import AdminCard from "../../adminCards/AdminCard";
import { useNavigate } from "react-router-dom";

const adminOptions = [
    {
        name: "Agregar nueva categoría",
        path: "/admin/categories/add",
        icon: FaPlusCircle,
        title: "Nueva Categoría",
        description: "Agrega una nueva categoría de paquetes turísticos."
    },
    {
        name: "Ver categorías registradas",
        path: "/admin/categories/list",
        icon: FaList,
        title: "Categorías Registradas",
        description: "Consulta la lista de categorías existentes."
    }
];

const categoryManagement = () => {
    const navigate = useNavigate();
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
                <div className={styles.cardsContainer}>
                    <div className={styles.cardContainer}>
                        <AdminCard options={adminOptions} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin")}
                        >
                            Regresar al Panel Administrador
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default categoryManagement;
