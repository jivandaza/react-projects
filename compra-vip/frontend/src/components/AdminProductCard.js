import React, { useState } from 'react';
import AdminEditProduct from './AdminEditProduct';
import { MdModeEditOutline } from 'react-icons/md';
import displayCOPCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({
    data,
    allProducts
}) => {

    const [showEditProduct, setShowEditProduct] = useState(false);

    return (
        <div className='bg-white p-4 rounded-md shadow-md '>
            <div className='w-40'>
                <div className='flex justify-center items-center'>
                    <div className='w-32 h-32'>
                        <img
                            src={data?.image[0]}
                            alt={data?.name}
                            width={120}
                            height={120}
                            className='mx-auto object-fill h-full'
                        />
                    </div>
                </div>
                <h1 className='my-2 text-ellipsis line-clamp-2'>{data.name}</h1>

                <div>
                    <p className='font-semibold'>
                        {
                            displayCOPCurrency(data.sellingPrice)
                        }
                    </p>

                    <div className='w-fit ml-auto bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-400 hover:text-white cursor-pointer'>
                        <MdModeEditOutline onClick={() => setShowEditProduct(true)} />
                    </div>
                </div>
            </div>

            {
                showEditProduct && (
                    <AdminEditProduct
                        onClose={() => setShowEditProduct(false)}
                        dataProduct={data}
                        allProducts={allProducts}
                    />
                )
            }
        </div>
    )
};

export default AdminProductCard;