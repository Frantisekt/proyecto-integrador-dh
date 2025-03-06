import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaList } from "react-icons/fa";
import styles from "./CategoryList.module.css";

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
                {/* Contenido de la lista de categorías irá aquí */}
            </div>
        </div>
    );
};

export default CategoryList;