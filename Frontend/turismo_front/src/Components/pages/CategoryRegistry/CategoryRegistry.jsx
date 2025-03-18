import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CategoryRegistry.module.css";
import { FaPlusCircle, FaList } from "react-icons/fa";
import getAllCategories from "../../services/getAllCategories";
import addCategory from "../../services/AddCategory";
import getAllPackages from "../../services/getAllPackages";
import { mediaCategoriesService } from '../../../services/mediaCategoriesService';
import { categoryServices } from '../../../services/categoryServices';
import { useNavigate } from "react-router-dom";

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

const CategoryRegistry = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        currency: "USD",
        restrictions: "",
        state: true,
        discount: "",
        tourPackageIds: []
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getAllPackages();
                setPackages(data.content);
            } catch (error) {
                console.error("Error al obtener los paquetes turísticos:", error);
            }
        };
        fetchPackages();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePackageSelection = (e) => {
        const packageId = parseInt(e.target.value, 10);
        const isChecked = e.target.checked;

        setFormData((prevData) => {
            let updatedTourPackageIds = [...prevData.tourPackageIds];

            if (isChecked) {
                if (!updatedTourPackageIds.includes(packageId)) {
                    updatedTourPackageIds.push(packageId);
                }
            } else {
                updatedTourPackageIds = updatedTourPackageIds.filter((id) => id !== packageId);
            }

            return { ...prevData, tourPackageIds: updatedTourPackageIds };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const validationError = validateCategoryForm(formData);
        if (validationError) {
            Swal.fire({ title: "Error", text: validationError, icon: "error", confirmButtonText: "Cerrar" });
            setLoading(false);
            return;
        }

        try {
            const formattedData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                currency: formData.currency,
                restrictions: formData.restrictions,
                state: formData.state === "true" || formData.state === true,
                discount: parseFloat(formData.discount),
                tourPackageIds: formData.tourPackageIds.map(Number),
                mediaCategoryIds: []
            };

            await addCategory(formattedData);
            let categories = await getAllCategories()
            let category = categories.find(category => category.title == formattedData.title)
            let categoryId = category.categoryId

            if (image) {
                // 2. Subir la imagen
                const mediaCategoriesResponse = await mediaCategoriesService.upload(image);
                const mediaCategoryId = mediaCategoriesResponse.mediaCategoryId;  // Deberíamos usar el id completo de la respuesta
                console.log('Imagen subida con ID:', mediaCategoryId);

                // 3. Asignar la imagen al paquete
                await categoryServices.assignMedia(categoryId, mediaCategoryId);
                console.log(`Imagen ${mediaCategoryId} asociada al paquete ${categoryId}`);
            }

            Swal.fire({
                title: "¡Categoría Registrada!",
                text: "La categoría ha sido agregada correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });

            // Reiniciar formulario
            setFormData({
                title: "",
                description: "",
                price: "",
                currency: "USD",
                restrictions: "",
                state: true,
                discount: "",
                tourPackageIds: []
            });
        } catch (error) {
            console.error("Error al registrar la categoría:", error);
            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema al registrar la categoría.",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
        } finally {
            setLoading(false)
        }
    };

    const validateCategoryForm = (data) => {
        if (!data.title.trim()) return "El título es obligatorio.";
        if (!data.description.trim()) return "La descripción es obligatoria.";
        if (!data.price || isNaN(data.price) || data.price <= 0) return "El precio debe ser un número positivo.";
        if (data.discount && (isNaN(data.discount) || data.discount < 0 || data.discount > 100))
            return "El descuento debe estar entre 0 y 100.";
        if (!data.currency) return "Debe seleccionar una moneda.";
        if (!Array.isArray(data.tourPackageIds) || data.tourPackageIds.length === 0)
            return "Debe seleccionar al menos un paquete turístico.";

        return null; // No hay errores
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
                <div className={styles.cardsContainer}>
                    <h2 className={styles.formTitle}>Registro de Categoría</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
                        {[
                            { name: "title", label: "Título" },
                            { name: "description", label: "Descripción" },
                            { name: "price", label: "Precio" },
                            { name: "restrictions", label: "Restricciones" },
                            { name: "discount", label: "Descuento" }
                        ].map(({ name, label }) => (
                            <div key={name} className="mb-3 text-start">
                                <label className={`form-label ${styles.label}`}>{label}</label>
                                <input
                                    type={name === "price" || name === "discount" ? "number" : "text"}
                                    className="form-control"
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}

                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}>Moneda</label>
                            <select className="form-select" name="currency" value={formData.currency} onChange={handleChange} required>
                                <option value="USD">Dólar estadounidense (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="COP">Peso colombiano (COP)</option>
                                <option value="MXN">Peso mexicano (MXN)</option>
                                <option value="ARS">Peso argentino (ARS)</option>
                            </select>
                        </div>

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
                                        <label htmlFor={`package-${pkg.packageId}`} className={`form-check-label ${styles.blackText}`}>
                                            {pkg.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}>Estado</label>
                            <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </select>
                        </div>

                        <div className="mb-3 text-start">
                            <label className={`form-label ${styles.label}`}> Subir imagen</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                disabled={loading}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/categories')}
                                className={`${styles.btnRegresar} ${styles.btnSmall}`}
                            >
                                Regresar
                            </button>
                            <button
                                type="submit"
                                className={`${styles.btnPrimary} ${styles.btnSmall}`}
                            >
                                Registrar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryRegistry;
