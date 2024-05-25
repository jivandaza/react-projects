import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SearchContext';

const DetailsPage = () => {

    const { setShowSearch } = useContext(SearchContext);

    useEffect(() => {
        setShowSearch(false);
    }, []);

    return (
        <div>
            DetailsPage
        </div>
    );
};

export default DetailsPage;