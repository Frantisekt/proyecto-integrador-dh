import { useState } from 'react';
import styles from './AdminPanel.module.css';
import RegisterProductModal from './RegisterProductModal';

const AdminPanel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Datos de ejemplo - después se reemplazarán con datos reales de la API
    const packages = [
        {
            id: 1,
            nombre: "Tour Asia",
            viajeros: 4,
            fechaPrevista: "2024-05-15",
            fechaRetorno: "2024-05-30",
            descripcion: "Recorrido por el sudeste asiático"
        },
        // ... más paquetes
    ];

    // Calcular el total de páginas (mínimo 1 página)
    const totalPages = Math.max(1, Math.ceil(packages.length / itemsPerPage));

    // Obtener los items de la página actual
    const getCurrentItems = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return packages.slice(indexOfFirstItem, indexOfLastItem);
    };

    // Cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
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

            <div className={styles.tableContainer}>
                <table className={styles.packagesTable}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Nro. de viajeros</th>
                            <th>Fecha prevista</th>
                            <th>Fecha de retorno</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCurrentItems().map(pkg => (
                            <tr key={pkg.id}>
                                <td>{pkg.nombre}</td>
                                <td>{pkg.viajeros}</td>
                                <td>{pkg.fechaPrevista}</td>
                                <td>{pkg.fechaRetorno}</td>
                                <td>{pkg.descripcion}</td>
                                <td>
                                    <button className={styles.editButton}>Editar</button>
                                    <button className={styles.deleteButton}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${styles.pageButton} ${styles.arrowButton}`}
                >
                    ←
                </button>
                
                <div className={styles.pageIndicators}>
                    {[...Array(totalPages)].map((_, index) => (
                        <div
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`${styles.pageIndicator} ${
                                currentPage === index + 1 ? styles.activeIndicator : ''
                            }`}
                        />
                    ))}
                </div>
                
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`${styles.pageButton} ${styles.arrowButton}`}
                >
                    →
                </button>
            </div>

            {isModalOpen && (
                <RegisterProductModal 
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminPanel; 