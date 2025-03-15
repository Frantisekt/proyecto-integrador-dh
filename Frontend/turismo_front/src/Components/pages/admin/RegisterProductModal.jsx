import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { tourPackageService } from '../../../services/tourPackageService';
import { mediaPackageService } from '../../../services/mediaPackageService';

const RegisterProductModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        state: true,
        price: '',
        start_date: '',
        end_date: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'state' ? value === 'true' : value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            // Primero, crea el paquete
            const packageResponse = await tourPackageService.create(formData);
            const packageId = packageResponse.packageId;
            console.log('Paquete creado con ID:', packageId);
            
            // Luego, sube la imagen si hay una seleccionada
            if (selectedFile) {
                const mediaResponse = await mediaPackageService.upload(
                    selectedFile,
                    formData.title, // Usa el título del paquete como mediaTitle
                    formData.description // Usa la descripción del paquete
                );
    
                const mediaPackageId = mediaResponse.mediaPackageId;
                console.log('Imagen subida con ID:', mediaPackageId);
    
                // Asigna la imagen al paquete
                await tourPackageService.assignMedia(packageId, mediaPackageId);
                console.log(`Imagen ${mediaPackageId} asociada al paquete ${packageId}`);
            }
            
            Swal.fire('¡Éxito!', 'Paquete registrado correctamente', 'success');
            onSave?.();
            onClose();
        } catch (error) {
            console.error('Error al registrar:', error);
            Swal.fire('Error', 'No se pudo registrar el paquete', 'error');
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark">Agregar Nuevo Paquete</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-dark">Título:</label>
                                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">Descripción:</label>
                                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">Estado:</label>
                                <select className="form-select" name="state" value={formData.state} onChange={handleChange} disabled={loading}>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">Precio:</label>
                                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">Fecha de Inicio:</label>
                                <input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} required disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">Fecha de Fin:</label>
                                <input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} required disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">Subir Imagen:</label>
                                <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} disabled={loading} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Agregando...' : 'Agregar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterProductModal;
