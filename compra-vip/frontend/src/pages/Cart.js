import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { MdDelete } from "react-icons/md";
import displayCOPCurrency from './../helpers/displayCurrency';
import summaryApi from '../common';
import toastr from 'toastr';
import Context from "../context";

const Cart = () => {

    const [Data, SetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartProductCount } = useContext(Context);

    const loadingCart = new Array(cartProductCount).fill(null);

    const fetchData = async () => {
        const response = await fetch(summaryApi.viewCartToProducts.url, {
            method: summaryApi.viewCartToProducts.method,
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

    };

    useEffect(() => {
        setIsLoading(true);
        handleLoading();
        setIsLoading(false);
    }, []);

    const totalQty = Data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0);
    const totalPrice = Data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.price) ,0);

    return (
        <div className='container mx-auto'>

            {/**        Mostrar Mensaje Productos Vacio      **/}
            {
                isLoading ? (
                    <div className='flex justify-center items-center h-[calc(93vh-85px)]'>
                        <p className='p-4 animate-pulse'></p>
                    </div>
                ) : (
                    Data.length === 0 && (
                        <div className='flex justify-center items-center h-[calc(93vh-85px)]'>
                            <p className='text-lg'>No hay productos en el carrito...</p>
                        </div>
                    )
                )
            }

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/**        Mostrar Productos      **/}
                <div className='w-full max-w-3xl'>
                    {
                        isLoading ? (
                            loadingCart.map(item => {
                                return (
                                    <div className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse' key={item+'loading'}>
                                    </div>
                                )
                            })
                        ) : (
                            Data.map(item => {
                                return (
                                    <div className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]' key={item?._id}>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={item?.productId?.image[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            {/**        Eliminar Producto      **/}
                                            <div className='absolute right-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(item?._id)}>
                                                <MdDelete/>
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{item?.productId?.name}</h2>
                                            <p className='capitalize text-slate-500'>{item?.productId.category}</p>

                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayCOPCurrency(item?.productId?.price)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayCOPCurrency(item?.productId?.price  * item?.quantity)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/**        Resumen      **/}
                <div className='mt-5 lg:mt-2 w-full max-w-sm'>
                    {
                        isLoading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                            </div>
                        ) : (
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
                                    <button className='bg-blue-600 p-2 text-white w-full mt-2 font-bold rounded-full hover:bg-blue-700'>
                                        Pagar
                                    </button>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Cart;