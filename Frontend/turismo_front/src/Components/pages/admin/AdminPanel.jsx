import { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';
import RegisterProductModal from './RegisterProductModal';
import { tourPackageService } from '../../../services/tourPackageService';

const AdminPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleDeletePackage = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este paquete?')) {
            try {
                await tourPackageService.deletePackage(id);
                await fetchPackages(); // Recargar la lista
            } catch (err) {
                setError('Error al eliminar el paquete');
            }
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
        
            {/* Mensaje para dispositivos móviles */}
            <div className={styles.mobileMessage}>
                <h2>Acceso no disponible</h2>
                <p>El panel de administración solo está disponible para dispositivos de escritorio. Por favor, accede desde una computadora.</p>
            </div>

            {/* Panel de administración */}
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
        </>
    );
};

export default AdminPanel; 