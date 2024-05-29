import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchContext } from '../context/SearchContext';
import Divider from '../components/Divider';
import VideoPlay from '../components/VideoPlay';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';
import useFetchDetails from '../hooks/useFetchDetails';
import Context from '../context';
import moment from 'moment';

const DetailsPage = () => {

    const params = useParams();
    const imageURL = useSelector(state => state.movieoData.imageURL);

    const { data } = useFetchDetails(`/${params?.explorar}/${params?.id}`);
    const { data: castData} = useFetchDetails(`/${params?.explorar}/${params?.id}/credits`);
    const { data : similarData } = useFetch(`/${params?.explorar}/${params?.id}/similar`);
    const { data : recommendationData } = useFetch(`/${params?.explorar}/${params?.id}/recommendations`);

    const [playVideo, setPlayVideo] = useState(false);
    const [playVideoId, setPlayVideoId] = useState('');

    const { setShowSearch } = useContext(SearchContext);
    const { setRouterDetails } = useContext(Context);

    //console.log(data);
    //console.log(castData);

    const handlePlayVideo = (data) => {
        setPlayVideoId(data);
        setPlayVideo(true);
    };

    const DefinedCategory = () => {
        return params?.explorar === 'tv' ? 'Programas TV' : params?.explorar === 'movie' ? 'Películas' : '';
    }

    useEffect(() => {
        setShowSearch(false);
        setRouterDetails(true);
    }, []);

    const duration = (data?.runtime/60)?.toFixed(1)?.split(".");
    const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ");

    return (
        <div>
            <div className='w-full h-[280px] relative hidden lg:block'>
                <div className='w-full h-full'>
                    <img
                        src={imageURL+data?.backdrop_path}
                        className='h-full w-full object-cover'
                    />
                </div>
                <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
            </div>

            <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
                <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
                    <img
                        src={imageURL+data?.poster_path}
                        className='h-80 w-60 object-cover rounded'
                    />
                    <button
                        className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'
                        onClick={() => handlePlayVideo(data)}
                    >Reproducir Ahora</button>
                </div>

                <div>
                    <h2 className='text-2xl lg:text-4xl font-bold text-white mt-2'>{data?.title || data?.name}</h2>
                    <p className='text-neutral-400'>{data?.tagline}</p>

                    <Divider/>

                    <div className='flex items-center gap-3'>
                        <p>
                            Clasificación:  {Number(data?.vote_average).toFixed(1)}+
                        </p>
                        <span>|</span>
                        <p>Vistas: { Number(data?.vote_count)}</p>
                        <span>|</span>
                        <p>Duración: {duration[0]}h {duration[1]}m</p>
                    </div>

                    <Divider/>

                    <div>
                        <h3 className='text-xl font-bold text-white mb-1'>Descripción</h3>
                        <p>{data?.overview}</p>

                        <Divider/>
                        <div className='flex items-center gap-3 my-3 text-center'>
                            <p>
                                Estado: {data?.status}
                            </p>
                            <span>|</span>
                            <p>
                                Lanzamiento: {moment(data?.release_date).format("MMMM Do YYYY")}
                            </p>
                            <span>|</span>
                            <p>
                                Ganancias: {Number(data?.revenue)}
                            </p>
                        </div>

                        <Divider/>
                    </div>

                    <div>
                        <p><span className='text-white'>Director</span>: {castData?.crew[0]?.name}</p>

                        <Divider/>

                        <p>
                            <span className='text-white'>Escritor: {writer}</span>
                        </p>
                    </div>

                    <Divider/>

                    <h2 className='font-bold text-lg'>Elenco :</h2>
                    <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
                        {
                            castData?.cast?.filter(el => el?.profile_path).map((starCast,index)=>{
                                return(
                                    <div>
                                        <div>
                                            <img
                                                src={imageURL+starCast?.profile_path}
                                                className='w-24 h-24 object-cover rounded-full'
                                            />
                                        </div>
                                        <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div>
                <HorizontalScrollCard
                    data={similarData}
                    heading={DefinedCategory() + ' Similares'}
                    media_type={params?.explorar}
                />
                <HorizontalScrollCard
                    data={recommendationData}
                    heading={DefinedCategory() + " Recomendadas"}
                    media_type={params?.explore}
                />
            </div>

            {
                playVideo && (
                    <VideoPlay
                        data={playVideoId}
                        close={()=>setPlayVideo(false)}
                        media_type={params?.explorar}
                    />
                )
            }
        </div>
    );
};

export default DetailsPage;