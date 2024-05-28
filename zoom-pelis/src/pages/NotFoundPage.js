import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';

const NotFoundPage = () => {

    const { setShowSearch } = useContext(SearchContext);

    useEffect(() => {
        setShowSearch(false);
    }, []);

    return (
        <div className="min-h-[100vh] bg-neutral-900 flex flex-col items-center justify-center">
            <h1 className="text-neutral-300 text-3xl font-bold">404 - Page Not Found</h1>
            <p className="text-neutral-300 mt-4">Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" className="bg-red-600 mt-6 text-white hover:bg-red-700 rounded-full px-3 py-1">
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;