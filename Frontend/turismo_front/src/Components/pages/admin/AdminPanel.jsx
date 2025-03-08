import { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';
import RegisterProductModal from './RegisterProductModal';
import EditPackageModal from './EditPackageModal';
import { tourPackageService } from '../../../services/tourPackageService';
import Swal from 'sweetalert2';

const AdminPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackageId, setEditingPackageId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const data = await tourPackageService.getAllPackages();
            setPackages(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los paquetes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditPackage = (packageId) => {
        console.log('Editando paquete:', packageId);
        setEditingPackageId(packageId);
    };

    const handleDeletePackage = async (packageId) => {
        console.log('Intentando eliminar paquete con ID:', packageId); // Debug log
        
        if (!packageId) {
            console.error('ID de paquete no válido');
            return;
        }

        try {
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
                setLoading(true);
                await tourPackageService.deletePackage(packageId);
                await fetchPackages();
                Swal.fire(
                    '¡Eliminado!',
                    'El paquete ha sido eliminado.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Swal.fire(
                'Error',
                'No se pudo eliminar el paquete',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    // Calcular el total de páginas
    const totalPages = Math.max(1, Math.ceil(packages.length / itemsPerPage));

    // Obtener los items de la página actual
    const getCurrentItems = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return packages.slice(indexOfFirstItem, indexOfLastItem);
    };

    return (
        <>
            <div className={styles.mobileMessage}>
                <h2>Acceso no disponible</h2>
                <p>El panel de administración solo está disponible para dispositivos de escritorio. Por favor, accede desde una computadora.</p>
            </div>

            <div className={styles.adminContainer}>
                <div className={styles.headerSection}>
                    <h1>Productos</h1>
                    <button 
                        className={styles.addButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Agregar Producto
                    </button>
                </div>

                {isModalOpen && (
                    <RegisterProductModal 
                        onClose={() => setIsModalOpen(false)}
                        onSave={fetchPackages}
                    />
                )}

                {error && <div className={styles.errorMessage}>{error}</div>}
                
                {loading ? (
                    <div className={styles.loading}>Cargando...</div>
                ) : (
                    <div className={styles.tableContainer}>
                        <table className={styles.packagesTable}>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getCurrentItems().map(pkg => (
                                    <tr key={pkg.packageId}>
                                        <td>{pkg.title}</td>
                                        <td>{pkg.description}</td>
                                        <td>{pkg.state ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            <button 
                                                className={styles.editButton}
                                                onClick={() => handleEditPackage(pkg.packageId)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className={styles.deleteButton}
                                                onClick={() => handleDeletePackage(pkg.packageId)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Paginación */}
                <div className={styles.pagination}>
                    <button 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1}
                        className={`${styles.pageButton} ${styles.arrowButton}`}
                    >
                        ←
                    </button>
                    
                    <div className={styles.pageIndicators}>
                        {[...Array(totalPages)].map((_, index) => (
                            <div
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`${styles.pageIndicator} ${
                                    currentPage === index + 1 ? styles.activeIndicator : ''
                                }`}
                            />
                        ))}
                    </div>
                    
                    <button 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === totalPages}
                        className={`${styles.pageButton} ${styles.arrowButton}`}
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Modal de edición */}
            {editingPackageId && (
                <EditPackageModal 
                    key={`edit-modal-${editingPackageId}`}
                    packageId={editingPackageId}
                    onClose={() => {
                        setEditingPackageId(null);
                    }}
                    onSave={() => {
                        fetchPackages();
                        setEditingPackageId(null);
                    }}
                />
            )}
        </>
    );
};

export default AdminPanel; 