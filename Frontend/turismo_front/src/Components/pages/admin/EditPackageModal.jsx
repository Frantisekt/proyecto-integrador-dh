import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { tourPackageService } from '../../../services/tourPackageService';
import { featureService } from '../../services/getAllFeatures';

const API_URL = 'http://localhost:8087/api/tourPackages';

const EditPackageModal = ({ packageId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: true,
    start_date: '',
    end_date: '',
    price: '',
    mediaPackageIds: [],
    featureIds: []
  });
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${packageId}`);
        setPackageDetails(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          state: response.data.state,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          price: response.data.price,
          mediaPackageIds: response.data.mediaPackages?.map(media => media.mediaPackageId) || [],
          featureIds: response.data.features || []
        });
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los detalles:', err);
        setError('Error al cargar los detalles del paquete');
        setLoading(false);
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await featureService.getAll();
        setFeatures(response);
      } catch (error) {
        console.error('Error al cargar características:', error);
      }
    };

    if (packageId) {
      fetchPackageDetails();
      fetchFeatures();
    }
  }, [packageId]);

  const handleFeatureChange = (featureId) => {
    setFormData((prev) => {
      const exists = prev.featureIds.includes(featureId); // Compara con featureId
      const updatedFeatures = exists
        ? prev.featureIds.filter((f) => f !== featureId) // Filtra por featureId
        : [...prev.featureIds, featureId]; // Agrega featureId

      return { ...prev, featureIds: updatedFeatures };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que featureIds sea un arreglo de números
    const featureIds1 = formData.featureIds.map(feature => Number(feature));

    console.log("featureIds1:", featureIds1);

    // Prepara el cuerpo de la solicitud
    const requestBody = {
      title: formData.title,
      description: formData.description,
      state: formData.state,
      start_date: formData.start_date,
      end_date: formData.end_date,
      price: Number(formData.price), // Asegúrate de que el precio sea un número
      mediaPackageIds: formData.mediaPackageIds,
      featureIds: featureIds1, // Asegúrate de que featureIds sea un arreglo de números
    };

    console.log("Request Body:", requestBody); // Depuración

    try {
      await axios.put(`${API_URL}/${packageId}`, requestBody);
      Swal.fire('¡Éxito!', 'Paquete actualizado correctamente', 'success');
      onSave();
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire('Error', 'No se pudo actualizar el paquete', 'error');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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

      const updatedPackage = await tourPackageService.getPackageById(packageId);
      setPackageDetails(updatedPackage);

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
      await axios.delete(`${API_URL}/${packageId}/media/${mediaPackageId}`);
      setPackageDetails(prev => ({ ...prev, mediaPackages: prev.mediaPackages.filter(media => media.mediaPackageId !== mediaPackageId) }));
      Swal.fire('¡Éxito!', 'Imagen eliminada correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      Swal.fire('Error', 'No se pudo eliminar la imagen', 'error');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark">Editar Paquete</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark">Título:</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Descripción:</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Estado:</label>
                <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Precio:</label>
                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Fecha de Inicio:</label>
                <input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Fecha de Fin:</label>
                <input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Características:</label>
                <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                  {features.map((feature) => (
                    <div key={feature.featureId} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={feature.featureId}
                        checked={formData.featureIds.includes(feature.featureId)}
                        onChange={() => handleFeatureChange(feature.featureId)} 
                      />
                      <label className="form-check-label text-dark">
                        {feature.displayName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              </div>
            </form>
            <hr />
            <div className="d-flex flex-wrap">
              {packageDetails?.mediaPackages?.map((media) => (
                <div key={media.mediaPackageId} className="m-2">
                  <img src={media.mediaUrl} alt={media.mediaTitle} className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                  <button className="btn btn-danger btn-sm mt-2" onClick={() => handleRemoveMedia(media.mediaPackageId)}>Eliminar</button>
                </div>
              ))}
            </div>
            <hr />
            <h5>Agregar Nueva Imagen</h5>
            <form onSubmit={handleMediaUpload} className="mb-3">
              <input type="file" className="form-control mb-2" accept="image/*" onChange={handleFileChange} required />
              <input type="text" className="form-control mb-2" placeholder="Título de la imagen" value={mediaTitle} onChange={(e) => setMediaTitle(e.target.value)} required />
              <textarea className="form-control mb-2" placeholder="Descripción de la imagen" value={mediaDescription} onChange={(e) => setMediaDescription(e.target.value)} required />
              <button type="submit" className="btn btn-success">Subir Imagen</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPackageModal;