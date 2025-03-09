import React, { useEffect, useState } from 'react'
import { getOnepackage } from '../../services/getOnePackage';
import { data } from 'react-router-dom';
import styles from "./Package.module.css";
import { Link } from 'react-router-dom';
import Gallery from '../../gallery/Gallery';
import flecha_atras from '../../../assets/flecha_atras.png'
import PackageDetails from '../../packageDetails/PackageDetails';
import PackageFeatures from '../../packageFeatures/PackageFeatures';


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
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/d6/c6/f8/caption.jpg?w=1400&h=1400&s=1&cx=989&cy=446&chk=v1_05762c604da56e26277e",
        "https://static.hosteltur.com/app/public/uploads/img/articles/2023/06/07/L_134919_londres-unsplash.jpg",
        "https://viajes.nationalgeographic.com.es/medio/2021/11/29/ljubljana-eslovenia_4a5588a6_1254x836.jpg",
        "https://turismo.encolombia.com/wp-content/uploads/2022/08/Italia-8-Lugares-Fascinantes-que-No-te-Puedes-Perder.webp",
        "https://concepto.de/wp-content/uploads/2020/03/coliseo-romano-scaled-e1731632602779.jpg",
        "https://www.deutschland.de/sites/default/files/styles/image_carousel_mobile/public/media/image/Glaspyramide-vor-dem-Louvre-in-Paris.jpg?itok=F_ukFGXv"
    ];

    const travelPackage = {
        packageId: 1,
        title: "Tour Europa",
        description: "Recorrido por las principales islas del Caribe",
        state: true,
        categories: [
            {
                categoryId: 1,
                title: "París",
                description: "Imagínate un tour nocturno que te lleve a descubrir la magia de Los Roques, Tortuga y Margarita. Durante la noche, estas islas se transforman en un escenario de ensueño, donde el reflejo de la luna se funde con las aguas cristalinas del mar Caribe. ",
                price: "1000",
                currency: "EUR",
                restrictions: "Ninguna",
                state: true,
                mediaCategories: [
                    {
                        mediaCategoryId: 1,
                        mediaTitle: "Los Roques, Tortuga y Margarita",
                        mediaDescription: "En Los Roques, la tranquilidad se acentúa, permitiéndote contemplar un cielo estrellado sin igual, en un ambiente íntimo y sereno. En Tortuga, la brisa marina y el sonido de las olas crean un telón de fondo perfecto para disfrutar de una velada relajada, mientras pequeñas fogatas iluminan la costa y reavivan historias de antaño. Finalmente, en Margarita, la vida nocturna se mezcla con la naturaleza, ofreciendo vistas panorámicas donde el resplandor de la ciudad se fusiona con la inmensidad del océano. Este recorrido te invita a sumergirte en una experiencia única, donde cada isla revela su propio encanto bajo el manto estrellado, haciendo de la noche un espectáculo inolvidable.",
                    },
                ],
            },
        ],
    };
    const { title, description, categories } = travelPackage;
    const [{ title: categoryTitle, description: categoryDescription, price, currency, restrictions, mediaCategories }] = categories || [];
    const [{ mediaTitle, mediaDescription, media }] = mediaCategories || [];
    const characteristics = [
        "Transporte",
        "Cata de vinos",
        "Almuerzo",
        "Bebidas",
        "Alojamiento con estrellas (doradas o plateadas)",
        "N# días",
        "Tour",
        "Spa",
        "Gliding",
        "Rapel",
        "Aire acondicionado"
    ];
    

    return (
        <div className={styles.mainContainer}>
            <Link to="/"><img src={flecha_atras} alt="flecha" className={styles.arrowIcon} /></Link>
            <h3 className={styles.subtitle}>Detalles</h3>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{title}</h1>
            </div>
            <Gallery images={images} className={styles.gallery}/>
            <PackageDetails 
                description={description} 
                categoryTitle = {categoryTitle}
                categoryDescription={categoryDescription} 
                price={price} 
                currency={currency} 
                restrictions={restrictions} 
                mediaTitle={mediaTitle} 
                mediaDescription={mediaDescription} 
            />
            <PackageFeatures features={characteristics} />
        </div >
    );
}

export default Package