import React, { useEffect, useState } from 'react'
import { getOnepackage } from '../../services/getOnePackage';
import { data } from 'react-router-dom';
import styles from "./Package.module.css";
import { Link } from 'react-router-dom';
import Gallery from '../../gallery/Gallery';
import flecha_atras from '../../../assets/flecha_atras.png'
import PackageDetails from '../../packageDetails/PackageDetails';

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
                description: "Un tour por París es una experiencia inolvidable que te permitirá descubrir la belleza y el encanto de la capital francesa, una de las ciudades más icónicas y románticas del mundo. Durante el recorrido, explorarás sus monumentos más emblemáticos, sus calles llenas de historia, y sus hermosos parques y jardines. Además de estos puntos icónicos, el tour podría incluir un paseo por el Sena, donde se puede disfrutar de un romántico crucero por el río, y una parada en los Jardines de Luxemburgo, ideales para relajarse y disfrutar de la naturaleza.",
                price: "1000",
                currency: "EUR",
                restrictions: "Ninguna",
                state: true,
                mediaCategories: [
                    {
                        mediaCategoryId: 1,
                        mediaTitle: "Torre Eiffel",
                        mediaDescription: "Un tour nocturno en la Torre Eiffel es una experiencia mágica que ofrece una vista impresionante de París iluminado. Al subir a la cima de la torre, podrás disfrutar de una panorámica única de la ciudad bajo el manto estrellado, mientras las luces de la ciudad brillan a lo lejos, creando un ambiente romántico y lleno de encanto.",
                    },
                ],
            },
        ],
    };
    const { title, description, categories } = travelPackage;
    const [{ title: categoryTitle, description: categoryDescription, price, currency, restrictions, mediaCategories }] = categories || [];
    const [{ mediaTitle, mediaDescription, media }] = mediaCategories || [];

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
        </div >
    );
}

export default Package