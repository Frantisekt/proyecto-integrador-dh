import { useState } from 'react';
import styles from './RegisterProductModal.module.css';

const RegisterProductModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        viajeros: '',
        fechaPrevista: '',
        fechaRetorno: '',
        descripcion: '',
        informacion: '',
        imagen: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí irá la lógica para enviar los datos al backend
        console.log(formData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Registrar producto</h2>
                    <button 
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Nombre del producto*</label>
                            <input 
                                type="text"
                                placeholder="Nombre del producto"
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Nro. de viajeros*</label>
                            <input 
                                type="number"
                                placeholder="Nro. de viajeros"
                                value={formData.viajeros}
                                onChange={(e) => setFormData({...formData, viajeros: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Fecha prevista*</label>
                            <input 
                                type="date"
                                value={formData.fechaPrevista}
                                onChange={(e) => setFormData({...formData, fechaPrevista: e.target.value})}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Fecha de retorno*</label>
                            <input 
                                type="date"
                                value={formData.fechaRetorno}
                                onChange={(e) => setFormData({...formData, fechaRetorno: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descripción del producto*</label>
                        <textarea 
                            placeholder="Descripción del producto"
                            value={formData.descripcion}
                            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Información del producto*</label>
                        <textarea 
                            placeholder="Información del producto"
                            value={formData.informacion}
                            onChange={(e) => setFormData({...formData, informacion: e.target.value})}
                        />
                    </div>

                    <div className={styles.previewSection}>
                        <label>Vista previa</label>
                        <div className={styles.imagePreview}>
                            {formData.imagen && (
                                <img src={URL.createObjectURL(formData.imagen)} alt="Preview" />
                            )}
                        </div>
                        <div className={styles.buttonGroup}>
                            <button type="button" className={styles.uploadButton}>
                                SUBIR IMAGEN
                            </button>
                            <button type="submit" className={styles.confirmButton}>
                                CONFIRMAR
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterProductModal; 