import React, { useContext, useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { MdDelete } from 'react-icons/md';
import displayCOPCurrency from './../helpers/displayCurrency';
import summaryApi from '../common/index';
import Context from '../context';
import ROLE from '../common/role';
import toastr from 'toastr';

const Cart = () => {

    const user = useSelector(state => state?.user?.user);
    const context = useContext(Context);

    const [Data, SetData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { fetchCountProductsToCart } = useContext(Context);

    const loadingCart = new Array(3).fill(null);

    let totalQty = 0;
    let totalPrice = 0;

    const fetchData = async () => {

        const response = await fetch(summaryApi.viewProductsOfCart.url, {
            method: summaryApi.viewProductsOfCart.method,
            credentials: 'include'
        });

        const { data, message, success, error } = await response.json();

        if ( success )
            SetData(data);

        if ( error ) {
            toastr.info(message);
            dispatch(setUserDetails(null));
            navigate('/');
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(summaryApi.deleteProductToCart.url,{
            method : summaryApi.deleteProductToCart.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(
                {
                    cartId: id,
                }
            )
        });

        const { message, success, error } = await response.json();

        if ( success ){
            fetchData();
            fetchCountProductsToCart();
        }

        if ( error ) {
            toastr.info(message);
            dispatch(setUserDetails(null));
            navigate('/');
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2){
            const response = await fetch(summaryApi.updateProductToCart.url,{
                method : summaryApi.updateProductToCart.method,
                credentials : 'include',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(
                    {
                        cartId : id,
                        quantity : qty - 1
                    }
                )
            });

            const { message, success, error } = await response.json();

            if ( success )
                fetchData();

            if ( error ) {
                toastr.info(message);
                dispatch(setUserDetails(null));
                navigate('/');
            }
        }
    };

    const increaseQty = async (id, qty) => {
        const response = await fetch(summaryApi.updateProductToCart.url,{
            method : summaryApi.updateProductToCart.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(
                {
                    cartId : id,
                    quantity : qty + 1
                }
            )
        });

        const { message, success, error } = await response.json();

        if ( success )
            fetchData();

        if ( error ) {
            toastr.info(message);
            dispatch(setUserDetails(null));
            navigate('/');
        }
    };

    useEffect(() => {
        setIsLoading(true);
        handleLoading();
        setIsLoading(false);
    }, []);

    {
        if ( Data ) {
            totalQty = Data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
            totalPrice = Data.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue?.productId?.price) ,0);
        }
    }

    return (
        context.isLoading ? (
            <div className='mx-auto container p-4 min-h-[80vh] flex items-center justify-center'>
                <span className='loader'></span>
            </div>
        ) : (
            user ? (
                user?.role === ROLE.ADMIN ? (
                    <Navigate to={'/admin-panel/productos'} replace />
                ) : (
                    <div className='container mx-auto min-h-[80vh]'>

                        {
                            !Data && (
                                <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                                    <div className='w-full max-w-3xl'>
                                        {
                                            loadingCart.map((item, index) => {
                                                return (
                                                    <div className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse' key={'loading'+index}>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='mt-5 lg:mt-2 w-full max-w-sm'>
                                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            !isLoading && (
                                Data && (
                                    Data.length === 0 ? (
                                        <div className='flex justify-center items-center h-[calc(93vh-85px)]'>
                                            <p className='text-lg'>No hay productos en el carrito...</p>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                                            <div className='w-full max-w-3xl'>
                                                {
                                                    Data.map(item => {
                                                        return (
                                                            <div className='w-full bg-white h-36 sm:h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]' key={item?._id}>
                                                                <div className='w-32 h-36 sm:h-32 bg-slate-200'>
                                                                    <img src={item?.productId?.image[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={item?.productId?.name} />
                                                                </div>
                                                                <div className='px-4 py-2 relative'>
                                                                    <div className='absolute right-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(item?._id)}>
                                                                        <MdDelete/>
                                                                    </div>

                                                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{item?.productId?.name}</h2>
                                                                    <p className='capitalize text-slate-500'>{item?.productId.category}</p>

                                                                    <div className='sm:flex items-center justify-between'>
                                                                        <p className='text-red-600 font-medium text-sm sm:text-lg'>{displayCOPCurrency(item?.productId?.price)}</p>
                                                                        <p className='text-slate-600 font-semibold text-sm sm:text-lg'>{displayCOPCurrency(item?.productId?.price * item?.quantity)}</p>
                                                                    </div>

                                                                    <div className='flex items-center gap-3 mt-1'>
                                                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=> decreaseQty(item?._id,item?.quantity)}>-</button>
                                                                        <span>{item?.quantity}</span>
                                                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=> increaseQty(item?._id,item?.quantity)}>+</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='mt-5 lg:mt-2 w-full max-w-sm'>
                                                <div className='h-36 bg-white'>

                                                    <h2 className='text-center uppercase text-white bg-red-600 py-1'>
                                                        Resumen
                                                    </h2>

                                                    <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                                                        <p>Cantidad</p>
                                                        <p>{totalQty}</p>
                                                    </div>

                                                    <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                                                        <p>Precio Total</p>
                                                        <p>{displayCOPCurrency(totalPrice)}</p>
                                                    </div>

                                                    <div className='px-4'>
                                                        <button
                                                            className='bg-blue-600 p-2 text-white w-full mt-2 font-bold rounded-full hover:bg-blue-700'
                                                            onClick={() => alert('Funcionalidad no disponible')}
                                                        >
                                                            Pagar
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            )
                        }

                    </div>
                )
            ) : (
                <Navigate to={'/'} replace />
            )
        )
    )
};

export default Cart;