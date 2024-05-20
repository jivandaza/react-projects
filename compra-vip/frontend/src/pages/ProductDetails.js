import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import displayCOPCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import summaryApi from '../common';
import toastr from 'toastr';

const ProductDetails = () => {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [activeImage,setActiveImage] = useState('');
    const [zoomImage,setZoomImage] = useState(false);
    const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
        x : 0,
        y : 0
    });

    const productImageListLoading = new Array(4).fill(null);
    const params = useParams();
    const navigation = useNavigate();
    const { fetchCountProductsToCart } = useContext(Context);

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true);
        const { left , top, width , height } = e.target.getBoundingClientRect();

        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        setZoomImageCoordinate({
            x,
            y
        });
    },[zoomImageCoordinate]);

    const handleLeaveImageZoom = () => {
        setZoomImage(false);
    };

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
    };

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);

        fetchCountProductsToCart();
    };

    const handleBuyToCart = async (e, id) => {
        await addToCart(e, id);

        fetchCountProductsToCart();

        navigation('/carrito');
    };

    const fetchProductDetails = async () => {
        setIsLoading(true);
        const response = await fetch(summaryApi.selectedProduct.url,{
            method: summaryApi.selectedProduct.method,
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                productId: params?.id
            })
        });

        const dataResponse = await response.json();

        if ( dataResponse.success ) {
            setData(dataResponse.data);
            setIsLoading(false);
            setActiveImage(dataResponse?.data?.image[0]);
        }

        if ( dataResponse.error ) {
            toastr.info(dataResponse.message);
            navigation(-1);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [params]);

    return (
        <div className='container mx-auto p-4 mb-3'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

                {/**        product Image       */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    {
                        isLoading ? (
                                <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 animate-pulse'>
                                </div>
                        ) : (
                            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                                <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

                                {/**        product zoom        */}
                                {
                                    zoomImage && (
                                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                            <div
                                                className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                                                style={{
                                                    background : `url(${activeImage})`,
                                                    backgroundRepeat : 'no-repeat',
                                                    backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                                                }}
                                            ></div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }

                    <div className='h-full'>
                        {
                            isLoading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageListLoading.map((el,index) =>{
                                            return(
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data?.image?.map((item) =>{
                                            return(
                                                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={item}>
                                                    <img src={item} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(item)}  onClick={()=>handleMouseEnterProduct(item)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/***product details */}
                {
                    isLoading ? (
                        <div className='grid gap-1 w-full'>
                            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
                            <h2 className='h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                            <p className='bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

                            <div className='bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'>
                            </div>

                            <div className='flex items-center gap-2 my-1 h-6 lg:h-8 animate-pulse w-full'>
                                <p className='bg-slate-200 w-full'></p>
                                <p className='bg-slate-200 w-full'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2 w-full'>
                                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                            </div>

                            <div className='w-full'>
                                <p className='my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>
                            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brand}</p>
                            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.name}</h2>
                            <p className='capitalize text-slate-400'>{data?.category}</p>

                            <div className='text-red-600 flex items-center gap-1'>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStarHalf/>
                            </div>

                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                                <p className='text-red-600'>{displayCOPCurrency(data.sellingPrice)}</p>
                                <p className='text-slate-400 line-through'>{displayCOPCurrency(data.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button
                                    className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'
                                    onClick={(e) => handleBuyToCart(e, data?._id)}
                                >
                                    Comprar
                                </button>
                                <button
                                    className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-2xl text-white bg-red-600 hover:text-red-600 hover:bg-white flex justify-center'
                                    onClick={(e) => handleAddToCart(e, data?._id)}
                                >
                                    <IoMdCart />
                                </button>
                            </div>

                            <div>
                                <p className='text-slate-600 font-medium my-1'>Descripción : </p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    )
                }

            </div>

            {
                !isLoading && (
                    <CategoryWiseProductDisplay
                        category={data?.category}
                        heading={'Recomendar Producto'}
                    />
                )
            }
        </div>
    )
};

export default ProductDetails;