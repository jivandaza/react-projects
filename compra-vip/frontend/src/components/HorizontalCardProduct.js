import React, {useEffect, useRef, useState} from 'react';
import fetchProductsByCategory from "../helpers/fetchProductsByCategory";
import toastr from "toastr";
import { IoMdCart } from "react-icons/io";
import displayCOPCurrency from "../helpers/displayCurrency";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";

const HorizontalCardProduct = ({category, heading}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const fetchData = async () => {
        setLoading(true);
        const response = await fetchProductsByCategory(category);

        if ( response.success ) {
            setData(response.data);
        }

        if ( response.error ) {
            toastr.info(response.message);
            setData(response.data);
        }

        setLoading(false);
    };

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-bold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button
                    className='bg-white text-red-600 shadow-md rounded-full p-1 hover:opacity-70 absolute left-0 text-lg hidden md:block'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-white text-red-600 shadow-md rounded-full p-1 hover:opacity-70 absolute right-0 text-lg hidden md:block'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {
                    loading ? (
                        loadingList.map((item, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex' key={index}>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                    </div>

                                    <div className='p-3 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                        <p className='p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                        <p className='p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                        <p className='p-1 bg-slate-200 animate-pulse rounded-full'></p>

                                        <div className='flex items-center py-1 w-10'>
                                            <button className='text-1xl p-3 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((item, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex' key={item.name + index}>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img
                                            src={item?.image[0]}
                                            alt={item?.name}
                                            className='object-scale-down h-full hover:scale-110 transition-all'
                                        />
                                    </div>

                                    <div className='p-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'
                                        >{item?.name}</h2>
                                        <p className='capitalize text-slate-500'>{item?.category}</p>

                                        <div className='flex flex-col'>
                                            <p
                                                className='text-red-600 font-medium'
                                            >{displayCOPCurrency(item?.sellingPrice)}</p>
                                            <p
                                                className='text-slate-500 line-through'
                                                style={{fontSize: '.8rem'}}
                                            >{displayCOPCurrency(item?.price)}</p>
                                        </div>

                                        <div className='flex items-center py-1'>
                                            <button className='bg-red-600 hover:bg-red-700 text-white text-1xl px-3 py-1 rounded-full'>
                                                <IoMdCart />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

        </div>
    )
};

export default HorizontalCardProduct;