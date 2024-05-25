import React, {useContext, useEffect} from 'react';
import { SearchContext } from '../context/SearchContext';

const ExplorePage = () => {

    const { setShowSearch } = useContext(SearchContext);

    useEffect(() => {
        setShowSearch(false);
    }, []);

    return (
        <div>
            Explore Page
        </div>
    );
};

export default ExplorePage;