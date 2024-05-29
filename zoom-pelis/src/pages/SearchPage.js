import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';

const SearchPage = () => {

    const location = useLocation();

    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);

    const query = location?.search?.slice(3);

    const handleScroll = ()=> {
        if( (window.innerHeight + window.scrollY ) >= document.body.offsetHeight )
            setPage(previousValue => previousValue + 1);
    };

    const fetchData = async ()=> {
        try {
            const response = await axios.get(`search/multi`,{
                params : {
                    query   :   location?.search?.slice(3),
                    page    :   page
                }
            });

            setData((previousValue)=>{
                return[
                    ...previousValue,
                    ...response.data.results
                ]
            });
        } catch (error) {
            console.log(error.message || error);
        }
    };

    useEffect(() => {
        if ( query ) {
            setData([]);
            setPage(1);
            fetchData();
        }
    }, [query]);

    useEffect(() => {
        if ( page > 1 ) {
            fetchData();
        }
    }, [page]);

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    },[]);

    return (
        <div className='py-16'>
            <div className='container mx-auto'>
                <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Resultados:</h3>

                <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
                    {
                        data.map((searchData, index)=>{
                            return(
                                <Card data={searchData} key={searchData.id+"search"+index} media_type={searchData.media_type}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchPage;