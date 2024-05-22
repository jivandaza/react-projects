import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryList from './../components/CategoryList';
import BannerProduct from './../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/verticalCardProduct';
import Context from '../context';
import ROLE from '../common/role';

const Home = () => {

    const user = useSelector(state => state?.user?.user);
    const { isLoading } = useContext(Context);

    if ( user?.role === ROLE.ADMIN )
        return <Navigate to={'/admin-panel/productos'} replace />

    return (
        isLoading ? (
            <div className='mx-auto container p-4 min-h-[80vh] flex items-center justify-center'>
                <span className='loader'></span>
            </div>
        ) : (
            <div className='mx-auto container p-4 min-h-[80vh]'>
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
    )
};

export default Home;