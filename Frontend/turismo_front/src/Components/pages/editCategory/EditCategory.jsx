import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlusCircle, FaList } from "react-icons/fa";
import styles from "./EditCategory.module.css";
import getAllCategories from "../../services/getAllCategories";
import getCategoryById from "../../services/getCategoryById";
import editCategory from "../../services/editCategory";
import getAllPackages from "../../services/getAllPackages";
import { categoryServices } from '../../../services/categoryServices';
import { mediaCategoriesService } from "../../../services/mediaCategoriesService";
import { useNavigate } from "react-router-dom";

const adminOptions = [
    { name: "Agregar nueva categoría", path: "/admin/categories/add", icon: FaPlusCircle },
    { name: "Ver categorías registradas", path: "/admin/categories/list", icon: FaList }
];

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        currency: "USD",
        restrictions: "",
        state: true,
        discount: 0,
        tourPackageIds: [],
        mediaCategories: []
    });
    const [image, setImage] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCategoryLoading, setIsCategoryLoading] = useState(true);
    const [isPackagesLoading, setIsPackagesLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryById(id);
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    currency: data.currency,
                    restrictions: data.restrictions,
                    state: data.state,
                    discount: data.discount,
                    tourPackageIds: data.tourPackages.map(pkg => pkg.packageId),
                    mediaCategories: data.mediaCategories || []
                });
                return data
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cargar la información de la categoría.",
                    icon: "error",
                    confirmButtonText: "Cerrar"
                });
            } finally {
                setIsCategoryLoading(false);
            }
        };

        const fetchPackages = async () => {
            try {
                const data = await getAllPackages();
                setPackages(data.content);
            } catch (error) {
                console.error("Error al obtener los paquetes turísticos:", error);
            } finally {
                setIsPackagesLoading(false);
            }
        };

        fetchCategory();
        fetchPackages();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
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
        try {
            await editCategory(id, formData);
            if (image) {
                let categories = await getAllCategories()
                let category = categories.find(category => category.title == formData.title)
                let categoryId = category.categoryId

                await categoryServices.removeMediaFromCategory(categoryId, formData.mediaCategories[0].mediaCategoryId)

                const mediaCategoriesResponse = await mediaCategoriesService.upload(image);
                const mediaCategoryId = mediaCategoriesResponse.mediaCategoryId;
                console.log('Imagen subida con ID:', mediaCategoryId);

                await categoryServices.assignMedia(categoryId, mediaCategoryId);
                console.log(`Imagen ${mediaCategoryId} asociada al paquete ${categoryId}`);
            }
            Swal.fire({
                title: "¡Actualización exitosa!",
                text: "La categoría ha sido actualizada correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
        } catch (error) {
            console.error('Error al actualizar la categoría:', error)
            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema al actualizar la categoría.",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
        } finally {
            setLoading(false)
        }
    };

    const isLoading = isCategoryLoading || isPackagesLoading;

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
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}><strong>Editar Categoría</strong></h2>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.formContainer}>
                            {["title", "description", "price", "restrictions", "discount"].map((field) => (
                                <div key={field} className="mb-3 text-start">
                                    <label className="form-label text-dark"><strong>{
                                        field === "title" ? "Título" :
                                            field === "description" ? "Descripción" :
                                                field === "price" ? "Precio" :
                                                    field === "restrictions" ? "Restricciones" :
                                                        "Descuento"
                                    }</strong></label>
                                    <input
                                        type={field === "price" || field === "discount" ? "number" : "text"}
                                        className="form-control text-dark"
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            ))}

                            <div className="mb-3 text-start">
                                <label className="form-label text-dark"><strong>Moneda</strong></label>
                                <select className="form-select text-dark" name="currency" value={formData.currency} onChange={handleChange}>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="COP">COP</option>
                                </select>
                            </div>

                            <div className="mb-3 text-start">
                                <label className="form-label text-dark"><strong>Seleccionar Paquetes Turísticos</strong></label>
                                <div className={styles.checkboxContainer}>
                                    {packages.map((pkg) => (
                                        <div key={pkg.packageId} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                value={pkg.packageId}
                                                checked={formData.tourPackageIds.includes(pkg.packageId)}
                                                onChange={handlePackageSelection}
                                            />
                                            <label className="form-check-label text-dark">{pkg.title}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3 text-start">
                                <label className={`form-label ${styles.label}`}> Subir imagen</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    disabled={loading}
                                />
                                <div className={styles.buttonContainer}>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/categories/list')}
                                    className={`${styles.btnRegresar} ${styles.btnSmall}`}
                                >
                                    Regresar
                                </button>
                                <button
                                    type="submit"
                                    className={`${styles.btnPrimary} ${styles.btnSmall}`}
                                >
                                    Editar
                                </button>
                            </div>
                            </div>
                            
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EditCategory;