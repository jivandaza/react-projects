import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';
import scrollTop from '../helpers/scrollTop';
import addToCart from '../helpers/addToCart';
import displayCOPCurrency from '../helpers/displayCurrency';
import Context from '../context';

const ShowProductsOfSearch = ({
    isLoading,
    data = []
}) => {

    const loadingList = new Array(13).fill(null);

    const { fetchCountProductsToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);

        fetchCountProductsToCart();
    };

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-4 md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
            {
                isLoading ? (
                    loadingList.map((item, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md' key={'loading'+index}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>

                                <div className='p-3 w-full grid gap-3'>
                                    <h2 className='p-1 py-2 animate-pulse rounded-full bg-slate-200'
                                    ></h2>
                                    <p className='p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                    <p className='p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                    <p className='p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>

                                    <div className='flex items-center py-1 w-10'>
                                        <button className='px-3 rounded-full bg-slate-200 py-2 w-full animate-pulse'>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((item, index) => {
                        return (
                            <Link
                                to={'/producto/'+item?._id}
                                key={item?.name+index}
                                className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow-md'
                                onClick={scrollTop}
                            >
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img
                                        src={item?.image[0]}
                                        alt={item?.name}
                                        className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
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
                                        <button
                                            className='bg-red-600 hover:bg-red-700 text-white text-1xl px-3 py-1 rounded-full'
                                            onClick={(e) => handleAddToCart(e, item?._id)}
                                        >
                                            <IoMdCart />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>
    )
};

export default ShowProductsOfSearch;