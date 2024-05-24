import React, {useContext, useEffect} from 'react';
import {SearchContext} from "../context/SearchContext";

const ExplorePage = () => {

    const { setShowSearch } = useContext(SearchContext);

    useEffect(() => {
        setShowSearch(false);
    }, []);

    return (
        <div>
            ExplorePage
        </div>
    );
};

export default ExplorePage;