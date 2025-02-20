import { useState } from 'react';
import styles from './RegisterProductModal.module.css';
import { tourPackageService } from '../../../services/tourPackageService';

const RegisterProductModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        state: true
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await tourPackageService.create(formData);
            console.log('Paquete creado:', response);
            onSave?.();
            onClose();
        } catch (error) {
            console.error('Error al crear el paquete:', error);
            setError(error.response?.data?.message || 'Error al crear el paquete');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.formHeader}>
                    Agregar Nuevo Paquete
                </div>
                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Título"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <select
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value === 'true'})}
                            disabled={loading}
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button 
                            type="button" 
                            className={styles.cancelButton} 
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? 'Agregando...' : 'Agregar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterProductModal; 