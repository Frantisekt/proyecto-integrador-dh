import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Carousel.module.css";

const ControlledCarousel = ({ images, openModal, isModalOpen }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className={`w-100 ${isModalOpen ? styles.hidden : ""}`}>
            {images.map((image, idx) => (
                <Carousel.Item key={idx}>
                    <img
                        className={`d-block w-100 ${styles.carouselImage}`} 
                        src={image.src}
                        alt={image.alt || `Slide ${idx + 1}`}
                        onClick={openModal} 
                        style={{ cursor: "pointer" }}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ControlledCarousel;
