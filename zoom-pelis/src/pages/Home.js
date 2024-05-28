import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SearchContext } from '../context/SearchContext';
import BannerHome from '../components/BannerHome';
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from '../hooks/useFetch';
import Context from '../context';

const Home = () => {

    const trendingData = useSelector(state => state.movieoData.bannerData);
    const { data : nowPlayingData, isLoading: isLoadingNowPlaying } = useFetch('/movie/now_playing');
    const { data : topRatedData, isLoading: isLoadingTopRated } = useFetch('/movie/top_rated');
    const { data : popularTvShowData, isLoading: isLoadingPopularTvShow } = useFetch('/tv/popular');
    const { data : onTheAirShowData, isLoading: isLoadingOnTheAir } = useFetch('/tv/on_the_air');

    const { setShowSearch } = useContext(SearchContext);
    const { isLoading } = useContext(Context);

    useEffect(() => {
        setShowSearch(false);
    }, []);

    return (
        <div>
            <BannerHome />
            <HorizontalScrollCard data={trendingData} heading={"Tendencias"} trending={true} isLoading={isLoading} />
            <HorizontalScrollCard data={nowPlayingData} heading={"Nuevo Ahora"} media_type={"movie"} isLoading={isLoadingNowPlaying} />
            <HorizontalScrollCard data={topRatedData} heading={"Los Más Valorados"} media_type={"movie"} isLoading={isLoadingTopRated} />
            <HorizontalScrollCard data={popularTvShowData} heading={"Programas TV Populares"} media_type={"tv"} isLoading={isLoadingPopularTvShow} />
            <HorizontalScrollCard data={onTheAirShowData} heading={"Programas TV en Emisión"} media_type={"tv"} isLoading={isLoadingOnTheAir} />
        </div>
    )
};

export default Home;