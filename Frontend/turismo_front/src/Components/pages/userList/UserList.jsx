import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserList.module.css";
import { FaUserCog } from "react-icons/fa";

const adminOptions = [
    { name: "Registrar usuario", path: "/admin/users/register", icon: FaUserCog },
    { name: "Ver usuarios registrados", path: "/admin/users/list", icon: FaUserCog }
];

const UserList = () => {
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
            
            {/* Contenido principal vacío */}
            <div className={styles.content}></div>
        </div>
    );
};

export default UserList;