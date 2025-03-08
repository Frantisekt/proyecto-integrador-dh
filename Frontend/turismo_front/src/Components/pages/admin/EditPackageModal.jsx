import React, { useState, useEffect } from 'react';
import styles from './EditPackageModal.module.css';
import Swal from 'sweetalert2';
import { tourPackageService } from '../../../services/tourPackageService';
import { obtenerCategorias } from "../../../services/categoryServices";

const EditPackageModal = ({ packageId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: true,
    mediaPackageIds: [],
    featureIds: []
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  // Cargar detalles del paquete
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        console.log('Fetching package with ID:', packageId);
        const response = await tourPackageService.getPackageById(packageId);
        console.log('Package details:', response);
        
        setPackageDetails(response);
        setFormData({
          title: response.title || '',
          description: response.description || '',
          state: response.state ?? true,
          mediaPackageIds: response.mediaPackages?.map(media => media.mediaPackageId) || [],
          featureIds: response.features?.map(feature => feature.id) || []
        });
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los detalles:', err);
        setError('Error al cargar los detalles del paquete');
        setLoading(false);
      }
    };

    if (packageId) {
      fetchPackageDetails();
    }
  }, [packageId]);

  // Cargar todas las categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await obtenerCategorias();
        setAllCategories(cats);
      } catch (err) {
        console.error('Error al cargar las categorías:', err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'state' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tourPackageService.updatePackage(packageId, formData);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Paquete actualizado correctamente',
        icon: 'success'
      });
      onSave();
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el paquete',
        icon: 'error'
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleMediaUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      Swal.fire('Error', 'Por favor selecciona una imagen', 'error');
      return;
    }

    try {
      const formDataMedia = new FormData();
      formDataMedia.append('file', selectedFile);
      formDataMedia.append('mediaTitle', mediaTitle);
      formDataMedia.append('mediaDescription', mediaDescription);

      const mediaResponse = await tourPackageService.uploadMedia(formDataMedia);
      await tourPackageService.addMediaToPackage(packageId, mediaResponse.mediaPackageId);

      // Recargar los detalles del paquete
      const updatedPackage = await tourPackageService.getPackageById(packageId);
      setPackageDetails(updatedPackage);
      
      // Limpiar el formulario de media
      setSelectedFile(null);
      setMediaTitle('');
      setMediaDescription('');
      
      Swal.fire('¡Éxito!', 'Imagen cargada correctamente', 'success');
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      Swal.fire('Error', 'No se pudo cargar la imagen', 'error');
    }
  };

  const handleRemoveMedia = async (mediaPackageId) => {
    try {
      await tourPackageService.removeMediaFromPackage(packageId, mediaPackageId);
      const updatedPackage = await tourPackageService.getPackageById(packageId);
      setPackageDetails(updatedPackage);
      Swal.fire('¡Éxito!', 'Imagen eliminada correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      Swal.fire('Error', 'No se pudo eliminar la imagen', 'error');
    }
  };

  if (loading) return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>Cargando...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.error}>{error}</p>
        <button onClick={onClose} className={styles.cancelButton}>
          Cerrar
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Paquete</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Estado:</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

       {/* Selección de categoría */}
<div className={styles.formGroup}>
  <label>Categoría:</label>
  <select
    name="categoryId"
    value={formData.categoryId || ""}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Selecciona una categoría</option>
    {allCategories.map(category => (
      <option key={category.categoryId} value={category.categoryId}>
        {category.title} - {category.price} {category.currency}
      </option>
    ))}
  </select>
</div>


          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Guardar Cambios
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Sección de imágenes actuales */}
        <div className={styles.mediaSection}>
          <h3>Imágenes del Paquete</h3>
          <div className={styles.mediaGrid}>
            {packageDetails?.mediaPackages?.map((media) => (
              <div key={media.mediaPackageId} className={styles.mediaItem}>
                <img src={media.mediaUrl} alt={media.mediaTitle} />
                <div className={styles.mediaInfo}>
                  <p>{media.mediaTitle}</p>
                  <button 
                    onClick={() => handleRemoveMedia(media.mediaPackageId)}
                    className={styles.removeButton}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario para agregar nueva imagen */}
        <form onSubmit={handleMediaUpload} className={styles.mediaUploadForm}>
          <h3>Agregar Nueva Imagen</h3>
          <div className={styles.formGroup}>
            <label>Imagen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Título de la imagen:</label>
            <input
              type="text"
              value={mediaTitle}
              onChange={(e) => setMediaTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Descripción de la imagen:</label>
            <textarea
              value={mediaDescription}
              onChange={(e) => setMediaDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.uploadButton}>
            Subir Imagen
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPackageModal;
