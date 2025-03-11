import { useState } from 'react';
import styles from './RegisterProductModal.module.css';
import { tourPackageService } from '../../../services/tourPackageService';
import { mediaPackageService } from '../../../services/mediaPackageService';

const RegisterProductModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        state: true,
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
    
        try {
            // 1. Crear el paquete turístico
            const packageResponse = await tourPackageService.create(formData);
            const packageId = packageResponse.packageId;  // Deberíamos usar el packageId completo
            console.log('Paquete creado con ID:', packageId);
            
            if (image) {
                // 2. Subir la imagen
                const mediaPackageResponse = await mediaPackageService.upload(image);
                const mediaPackageId = mediaPackageResponse.mediaPackageId;  // Deberíamos usar el id completo de la respuesta
                console.log('Imagen subida con ID:', mediaPackageId);

                // 3. Asignar la imagen al paquete
                await tourPackageService.assignMedia(packageId, mediaPackageId);
                console.log(`Imagen ${mediaPackageId} asociada al paquete ${packageId}`);
            }
            
            // Cerrar el modal y ejecutar la función onSave
            onSave?.();
            onClose();
        } catch (error) {
            console.error('Error en el proceso:', error);
            setError(error.message || 'Error al procesar la solicitud');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.formHeader}>Agregar Nuevo Paquete</div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Título"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <select
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value === 'true' })}
                            disabled={loading}
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Subir Imagen</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Agregando...' : 'Agregar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterProductModal;


