import React, {useContext, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import ShowProductsOfSearch from '../components/ShowProductsOfSearch';
import summaryApi from '../common';
import Context from '../context';
import ROLE from '../common/role';

const SearchProduct = () => {

    const user = useSelector(state => state?.user?.user);
    const context = useContext(Context);

    const [Data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    const fetchData = async () => {

        if ( !query || query.trim() === '' ) {
            setData([]);
            return;
        }

        setIsLoading(true);
        const response = await fetch(summaryApi.searchProduct.url+location.search, {
            method: summaryApi.searchProduct.method,
            credentials: 'include'
        });

        const { data, success } = await response.json();

        if ( success )
            setData(data);

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    if ( user?.role === ROLE.ADMIN )
        return <Navigate to={'/admin-panel/productos'} replace />

    return (
        context.isLoading ? (
            <div className='mx-auto container p-4 min-h-[80vh] flex items-center justify-center'>
                <span className='loader'></span>
            </div>
        ) : (
            <div className='container mx-auto p-4 min-h-[80vh]'>

                <p className='text-lg font-semibold my-3'>Resultados Busqueda: {Data.length}</p>

                {
                    isLoading && (
                        <div className='flex justify-center items-center w-full py-4'>
                            <span className='loader'></span>
                        </div>
                    )
                }

                {
                    Data.length === 0 && !isLoading && (
                        <p className='bg-white text-lg text-center py-4'>No se encuentran resultados...</p>
                    )
                }

                {
                    Data.length !==0 && !isLoading && (
                        <ShowProductsOfSearch
                            isLoading={isLoading}
                            data={Data}
                        />
                    )
                }

            </div>
        )
    )
};

export default SearchProduct;