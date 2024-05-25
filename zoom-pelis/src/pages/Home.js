import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SearchContext';
import BannerHome from '../components/BannerHome';

const Home = () => {

    const { setShowSearch } = useContext(SearchContext);

    useEffect(() => {
        setShowSearch(false);
    }, []);

    return (
        <div>
            <BannerHome />
        </div>
    )
};

export default Home;