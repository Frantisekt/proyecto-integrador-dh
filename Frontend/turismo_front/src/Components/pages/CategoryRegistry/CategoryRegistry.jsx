import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CategoryRegistry.module.css";
import { FaPlusCircle, FaList } from "react-icons/fa";
import addCategory from "../../services/AddCategory";
import getAllPackages from "../../services/getAllPackages";

// Opciones del Sidebar
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

const CategoryRegistry = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        currency: "USD",
        restrictions: "",
        state: true,
        discount: "",
        tourPackageIds: [],
        mediaCategoryIds: ""
    });

    const [packages, setPackages] = useState([]);

    // Cargar los paquetes turísticos al montar el componente
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getAllPackages();
                setPackages(data);
            } catch (error) {
                console.error("Error al obtener los paquetes turísticos:", error);
            }
        };

        fetchPackages();
    }, []);

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar selección de paquetes turísticos con checkboxes
    const handlePackageSelection = (e) => {
        const packageId = parseInt(e.target.value, 10);
        const isChecked = e.target.checked;

        setFormData((prevData) => {
            let updatedTourPackageIds = [...prevData.tourPackageIds];

            if (isChecked) {
                updatedTourPackageIds.push(packageId);
            } else {
                updatedTourPackageIds = updatedTourPackageIds.filter((id) => id !== packageId);
            }

            return { ...prevData, tourPackageIds: updatedTourPackageIds };
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...formData,
                price: parseFloat(formData.price),
                discount: parseFloat(formData.discount),
                mediaCategoryIds: formData.mediaCategoryIds.split(",").map(Number) || []
            };

            await addCategory(formattedData);

            Swal.fire({
                title: "¡Categoría Registrada!",
                text: "La categoría ha sido agregada correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });

            // Limpiar el formulario
            setFormData({
                title: "",
                description: "",
                price: "",
                currency: "USD",
                restrictions: "",
                state: true,
                discount: "",
                tourPackageIds: [],
                mediaCategoryIds: ""
            });

        } catch {
            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema al registrar la categoría.",
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
                    <h2 className={styles.formTitle}>Registro de Categoría</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        {/* Campos del formulario */}
                        {[
                            { label: "Título", name: "title", type: "text" },
                            { label: "Descripción", name: "description", type: "text" },
                            { label: "Precio", name: "price", type: "number" },
                            { label: "Restricciones", name: "restrictions", type: "text" },
                            { label: "Descuento (%)", name: "discount", type: "number" },
                            { label: "IDs de Categorías de Medios (separados por comas)", name: "mediaCategoryIds", type: "text" }
                        ].map(({ label, name, type }) => (
                            <div key={name} className="mb-3 text-start">
                                <label className={`form-label ${styles.label}`}>{label}</label>
                                <input
                                    type={type}
                                    className="form-control"
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}

                        {/* Select para la moneda */}
                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}>Moneda</label>
                            <select
                                className="form-select"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                required
                            >
                                <option value="USD">Dólar estadounidense (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="COP">Peso colombiano (COP)</option>
                                <option value="MXN">Peso mexicano (MXN)</option>
                                <option value="ARS">Peso argentino (ARS)</option>
                            </select>
                        </div>

                        {/* Checkboxes para los paquetes turísticos */}
                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}>Seleccionar Paquetes Turísticos</label>
                            <div className={`${styles.checkboxContainer} ${styles.scrollableContainer}`}>
                                {packages.map((pkg) => (
                                    <div key={pkg.packageId} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={pkg.packageId}
                                            id={`package-${pkg.packageId}`}
                                            checked={formData.tourPackageIds.includes(pkg.packageId)}
                                            onChange={handlePackageSelection}
                                        />
                                        <label
                                            htmlFor={`package-${pkg.packageId}`}
                                            className={`form-check-label ${styles.blackText}`}
                                        >
                                            {pkg.title} - {pkg.description}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Select para el estado */}
                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}>Estado</label>
                            <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </select>
                        </div>

                        <button type="submit" className={`btn btn-primary ${styles.btnSmall}`}>Registrar Categoría</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryRegistry;
