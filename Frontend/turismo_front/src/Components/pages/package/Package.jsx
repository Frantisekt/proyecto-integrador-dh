import React, { useEffect, useState } from 'react'
import { getOnepackage } from '../../services/getOnePackage';
import { data } from 'react-router-dom';

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

    return (
        <>
        <div>pagina detalle paquete</div>
        </>
    )
}

export default Package