import React, { useEffect, useState } from 'react'
import { getOnepackage } from '../../services/getOnePackage';
import { data } from 'react-router-dom';
import styles from "./Package.module.css";
import { Link } from 'react-router-dom';

const Package = () => {
    /*const { id } = useParams();
    const [travelPackage, setTravelPackage] = useState(null);

    useEffect(() => {
        getOnepackage(id).then(data => {
            setTravelPackage(data);
        })
    }, [id]);

    if (!travelPackage) return <p>Loading...</p>;

    const { title, description, categories } = response;
    const [{ title: categoryTitle, description: categoryDescription, price, currency, mediaCategories }] = categories || [];
    const [{ mediaTitle, mediaDescription, media }] = mediaCategories || [];
    const {url} = media || {};
    */

    //parte del front harcodeado
    const images = [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/10/74/8b/bungalows-facing-mont.jpg?w=700&h=-1&s=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/60/b0/bd/bora-bora.jpg?w=1400&h=1400&s=1",
        "https://images.trvl-media.com/lodging/1000000/560000/558800/558749/37620ff7.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
        "https://images.prismic.io/airmoana/Zhch6zjCgu4jzvRD_DestinationBoraBora-HERO-BoraBora.jpg?auto=format,compress",
        "https://thalasso.intercontinental.com/wp-content/uploads/2020/11/17-12-ICB-0082_Tim-Mckenna-1024x768.jpg",
        "https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt7d6d1039edc8fad1/60ab286f909370737ae497ee/UK_Bora-Bora_French_Polynesia_Header.jpg"
    ];

    const travelPackage = {
        packageId: 1,
        title: "Tour Europa",
        description: "Recorrido por las principales ciudades europeas",
        state: true,
        categories: [
            {
                categoryId: 1,
                title: "París",
                description: "Tour por París",
                price: "1000",
                currency: "EUR",
                restrictions: "Ninguna",
                state: true,
                mediaCategories: [
                    {
                        mediaCategoryId: 1,
                        mediaTitle: "Torre Eiffel",
                        mediaDescription: "Vista nocturna",
                    },
                ],
            },
        ],
    };

    const { title, description, categories } = travelPackage;
    const [{ title: categoryTitle, description: categoryDescription, price, currency, restrictions, mediaCategories }] = categories || [];
    const [{ mediaTitle, mediaDescription, media }] = mediaCategories || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openSecondModal = (index) => {
        setSelectedImageIndex(index);
        setIsSecondModalOpen(true);
    };

    const changeImage = (direction) => {
        if (direction === "next") {
            setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else {
            setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <Link to="/"><i className={`bi bi-arrow-left ${styles.arrowIcon}`}></i></Link>
            <h1>{title}</h1>
            <div className={styles.packageContainer}>

                {/* Galería de imágenes */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <img src={images[0]} alt="Main" onClick={() => setIsModalOpen(true)} />
                    </div>
                    <div className={styles.sideImages}>
                        {images.slice(1, 5).map((img, index) => (
                            <img key={index} src={img} alt={`Gallery ${index + 1}`} onClick={() => setIsModalOpen(true)}  />
                        ))}
                        <button className={styles.viewMoreBtn} onClick={() => setIsModalOpen(true)}>
                            Ver más fotos
                        </button>
                    </div>
                </div>

                {/* Modal de imágenes */}
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>✖</button>
                            <div className={styles.modalGallery}>
                                {images.map((img, index) => (
                                    <img key={index} src={img} alt={`Modal ${index + 1}`} onClick={() => openSecondModal(index)}/>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Segundo modal para ver la imagen en grande */}
                {isSecondModalOpen && (
                    <div className={styles.secondModal}>
                        <div className={styles.secondModalContent}>
                            <button className={styles.closeBtn} onClick={() => setIsSecondModalOpen(false)}>✖</button>
                            <img src={images[selectedImageIndex]} alt="Selected" className={styles.largeImage} />
                            <div className={styles.imageControls}>
                                <button onClick={() => changeImage("prev")}>⬅</button>
                                <button onClick={() => changeImage("next")}>➡</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

export default Package