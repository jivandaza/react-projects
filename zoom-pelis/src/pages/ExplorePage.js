import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import Card from '../components/Card';
import axios from 'axios';

const ExplorePage = () => {

    const params = useParams();

    //console.log(params.explorar);

    const { setShowSearch } = useContext(SearchContext);

    const [data,setData] = useState([]);
    const [pageNo,setPageNo] = useState(1);
    const [totalPageNo,setTotalPageNo] = useState(0);

    const handleScroll = () => {
        if( (window.innerHeight + window.scrollY) >= document.body.offsetHeight )
            setPageNo(previousValue => previousValue + 1);
    };

    const fetchData = async ()=> {
        try {
            const response = await axios.get(`/discover/${params.explorar === 'pelicula' ? 'movie' : params.explorar}`,{
                params : {
                    page : pageNo
                }
            });

            setData((previousValue) => {
                return [
                    ...previousValue,
                    ...response.data.results
                ]
            });

            setTotalPageNo(response.data.total_pages);
        } catch (error) {
            console.error(error.message || error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNo]);

    useEffect(() => {
        setPageNo(1);
        setData([]);
        fetchData();
    }, [params.explorar]);

    useEffect(() => {
        setShowSearch(false);
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='py-16'>
            <div className='container mx-auto'>
                <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>{params.explorar === 'tv' ? 'Programas TV' : 'Películas' } Populares</h3>

                <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
                    {
                        data.map((exploreData,index)=>{
                            return(
                                <Card data={exploreData} key={exploreData.id+"exploreSection"} media_type={params.explorar === 'pelicula' ? 'movie' : params.explorar}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;