import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import getTourPackage from '../../services/getOneTourPackage';
import styles from './Package.module.css';
import Gallery from '../../gallery/Gallery';
import flecha_atras from '../../../assets/flecha_atras.png';
import PackageDetails from '../../packageDetails/PackageDetails';
import PackageFeatures from '../../packageFeatures/PackageFeatures';

const Package = () => {
    const { id } = useParams();
    const [travelPackage, setTravelPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const data = await getTourPackage(id);
                setTravelPackage(data);
            } catch (err) {
                setError('Error al cargar el paquete');
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if (!travelPackage) return <p>No se encontró el paquete</p>;

    const { title, description, start_date, end_date, price, mediaPackages = [], features = [] } = travelPackage;
    const images = mediaPackages.map(media => media.mediaUrl);

    return (
        <div className={styles.mainContainer}>
            <Link to="/"><img src={flecha_atras} alt="Volver" className={styles.arrowIcon} /></Link>
            <h3 className={styles.subtitle}>Detalles</h3>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{title}</h1>
            </div>
            {images.length > 0 && <Gallery images={images} className={styles.gallery} />}
            <PackageDetails description={description} startDate={start_date} endDate={end_date} price={price} />
            <PackageFeatures features={features} />
        </div>
        
    );
};

export default Package;
