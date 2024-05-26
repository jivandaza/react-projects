import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SearchContext } from '../context/SearchContext';
import BannerHome from '../components/BannerHome';
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import FullPageIsLoading from "../components/FullPageIsLoading";
import useFetch from '../hooks/useFetch';
import Context from "../context";

const Home = () => {

    const trendingMovies = useSelector(state => state.movieoData.bannerData);
    const { data : nowPlayingData, isLoading: isLoadingNowPlaying } = useFetch('/movie/now_playing');

    const { setShowSearch } = useContext(SearchContext);
    //const { isLoading } = useContext(Context);

    useEffect(() => {
        setShowSearch(false);
    }, []);

    return (
        <div>
            <BannerHome />
            <HorizontalScrollCard data={nowPlayingData} heading={"Nuevo Ahora"} media_type={"pelicula"} isLoading={isLoadingNowPlaying} />
        </div>
    )
};

export default Home;