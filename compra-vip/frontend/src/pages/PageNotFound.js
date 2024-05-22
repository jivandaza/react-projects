import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="min-h-[80vh] bg-slate-200 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4">Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" className="bg-red-600 mt-6 text-white hover:bg-red-700 rounded-full px-3 py-1">
                Volver al inicio
            </Link>
        </div>
    );
};

export default PageNotFound;