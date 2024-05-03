import React from 'react';
import CategoryList from './../components/CategoryList';
import BannerProduct from './../components/BannerProduct';
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/verticalCardProduct";

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />

            <HorizontalCardProduct
                category={'auriculares'}
                heading={'Mejores Aurículares'}
            />
            <HorizontalCardProduct
                category={'relojes'}
                heading={'Relojes Populares'}
            />

            <VerticalCardProduct
                category={'moviles'}
                heading={'Nuestros Móviles'}
            />
            <VerticalCardProduct
                category={'mouse'}
                heading={'Nuestros Mouse'}
            />
            <VerticalCardProduct
                category={'televisores'}
                heading={'Nuestros Televisores'}
            />
            <VerticalCardProduct
                category={'camara'}
                heading={'Nuestros Camaras'}
            />
            <VerticalCardProduct
                category={'airpods'}
                heading={'Nuestros Airpods'}
            />
            <VerticalCardProduct
                category={'parlantes'}
                heading={'Nuestros Parlantes'}
            />
            <VerticalCardProduct
                category={'refrigerador'}
                heading={'Nuestros Refrigeradores'}
            />
            <VerticalCardProduct
                category={'procesador'}
                heading={'Nuestros Procesadores'}
            />
            <VerticalCardProduct
                category={'recortadoras'}
                heading={'Nuestras Recortadoras de Cabello'}
            />
            <VerticalCardProduct
                category={'impresoras'}
                heading={'Nuestras Impresoras'}
            />
        </div>
    )
};

export default Home;