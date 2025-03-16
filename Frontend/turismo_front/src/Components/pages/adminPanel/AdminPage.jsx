import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminPage.module.css";
import { FaUserCog, FaPlane, FaTags } from "react-icons/fa";
import AdminCard from "../../adminCards/AdminCard";

const adminOptions = [
    {
        name: "Gestionar paquetes turísticos",
        path: "/admin/packages",
        icon: FaPlane,
        title: "Paquetes Turísticos",
        description: "Administra los paquetes turísticos disponibles para los clientes."
    },
    {
        name: "Gestionar usuarios",
        path: "/admin/users",
        icon: FaUserCog,
        title: "Usuarios",
        description: "Gestiona los usuarios del sistema, asigna roles y controla accesos."
    },
    {
        name: "Gestionar categorías",
        path: "/admin/categories",
        icon: FaTags,
        title: "Categorías",
        description: "Organiza y administra las categorías de los paquetes turísticos."
    }
];

const AdminPage = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isDesktop) {
        return (
            <div className={styles.mobileMessage}>
                <h2>Acceso restringido</h2>
                <p>Esta página solo está disponible en computadoras de escritorio.</p>
            </div>
        );
    }

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
                    <div className={styles.welcomeContainer}>
                        <h2 className={styles.welcome}>Bienvenido, Admin!</h2>
                        <p className={styles.subtitle}>¿Qué deseas gestionar hoy?</p>
                    </div>
                    <div className={styles.cardContainer}>
                        <AdminCard options={adminOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
