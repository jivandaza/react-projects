import React, { useEffect, useState } from 'react';
import AdminProductCard from './../components/AdminProductCard';
import UploadProduct from './../components/UploadProduct';
import summaryApi from "../common";
import toastr from "toastr";

const AllProducts = () => {

    const [showUploadProduct, setShowUploadProduct] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const fetchAllProducts = async () => {
        const response = await fetch(summaryApi.allProducts.url, {
            method: summaryApi.allProducts.method,
            credentials: 'include'
        });

        const { data, message, success, error } = await response.json();

        if ( success )
            setAllProducts(data);

        if ( error ) {
            toastr.info(message);
            setAllProducts(data);
        }
    };

    useEffect( ()  => {
        fetchAllProducts();
    }, []);

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold'>Productos</h2>
                <button
                    className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
                    onClick={() => setShowUploadProduct(true)}
                >Subir Producto</button>
            </div>

            <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(80vh-85px)] overflow-y-scroll'>
                {
                    allProducts.map((item, index) => {
                        return (
                            <AdminProductCard
                                data={item}
                                key={'product'+index}
                                allProducts={fetchAllProducts}
                            />
                        )
                    })
                }
            </div>

            {
                showUploadProduct && (
                    <UploadProduct
                        onClose={() => setShowUploadProduct(false)}
                        allProducts={fetchAllProducts}
                    />
                )
            }
        </div>
    )
};

export default AllProducts;