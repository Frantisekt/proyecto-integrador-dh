import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from './AdminPanel.module.css';
import RegisterProductModal from './RegisterProductModal';
import EditPackageModal from './EditPackageModal';
import { tourPackageService } from '../../../services/tourPackageService';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackageId, setEditingPackageId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPackages();
    }, [currentPage]);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const response = await tourPackageService.getAllPackages(currentPage - 1);
            setPackages(response.content);
            setTotalPages(response.totalPages);
            setError(null);
        } catch (err) {
            setError('Error al cargar los paquetes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditPackage = (packageId) => {
        setEditingPackageId(packageId);
    };

    const handleDeletePackage = async (packageId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                setLoading(true);
                await tourPackageService.deletePackage(packageId);
                await fetchPackages();
                Swal.fire('¡Eliminado!', 'El paquete ha sido eliminado.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el paquete', 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={styles.adminContainer}>
            <div className={styles.headerSection}>
                <h1>Productos</h1>
                <div className={styles.buttonGroup}>
                    <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
                        Regresar al Panel Administrador
                    </button>
                    <button className="btn btn-success" onClick={() => setIsModalOpen(true)}>
                        Agregar Producto
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <RegisterProductModal onClose={() => setIsModalOpen(false)} onSave={fetchPackages} />
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map(pkg => (
                                <tr key={pkg.packageId}>
                                    <td>{pkg.title}</td>
                                    <td>{pkg.description}</td>
                                    <td>
                                        <span className={`badge ${pkg.state ? 'bg-success' : 'bg-secondary'}`}>
                                            {pkg.state ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditPackage(pkg.packageId)}>
                                            <FaEdit /> Editar
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeletePackage(pkg.packageId)}>
                                            <FaTrash /> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-outline-primary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>← Anterior</button>
                <span className="align-self-center">Página {currentPage} de {totalPages}</span>
                <button className="btn btn-outline-primary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Siguiente →</button>
            </div>

            {editingPackageId && (
                <EditPackageModal
                    key={`edit-modal-${editingPackageId}`}
                    packageId={editingPackageId}
                    onClose={() => setEditingPackageId(null)}
                    onSave={() => {
                        fetchPackages();
                        setEditingPackageId(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminPanel;
