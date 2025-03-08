import React, { useState, useEffect } from "react";
import ControlledCarousel from '../carousel/Carousel';
import styles from "./Gallery.module.css";
import flecha_atras from '../../assets/flecha_atras.png';

const Gallery = ({ images }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 730);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 730);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        <div className={styles.galleryContainer}>
            {isMobile ? (
                <ControlledCarousel images={images.map(src => ({ src }))} openModal={() => setIsModalOpen(true)} isModalOpen={isModalOpen} />
            ) : (
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <img src={images[0]} alt="Main" onClick={() => setIsModalOpen(true)} />
                    </div>
                    <div className={styles.sideImages}>
                        {images.slice(1, 5).map((img, index) => (
                            <img key={index} src={img} alt={`Gallery ${index + 1}`} onClick={() => setIsModalOpen(true)} />
                        ))}
                        <button className={styles.viewMoreBtn} onClick={() => setIsModalOpen(true)}>
                            Ver más fotos
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de imágenes */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <img src={flecha_atras} alt="flecha" className={styles.closeBtn} onClick={() => setIsModalOpen(false)}/>
                        <div className={styles.modalGallery}>
                            {images.map((img, index) => (
                                <img key={index} src={img} alt={`Modal ${index + 1}`} onClick={() => openSecondModal(index)} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Segundo modal para ver la imagen en grande */}
            {isSecondModalOpen && (
                <div className={styles.secondModal}>
                    <div className={styles.secondModalContent}>
                        <img src={flecha_atras} alt="flecha" className={styles.closeBtn} onClick={() => setIsSecondModalOpen(false)}/>
                        <img src={images[selectedImageIndex]} alt="Selected" className={styles.largeImage} />
                        <div className={styles.imageControls}>
                            <button onClick={() => changeImage("prev")}><i className="bi bi-arrow-left-short"></i></button>
                            <button onClick={() => changeImage("next")}><i className="bi bi-arrow-right-short"></i></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
