import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import summaryApi from "../common";
import toastr from "toastr";

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);

        const response = await fetch(summaryApi.categoryProduct.url, {
            method: summaryApi.categoryProduct.method,
            credentials: 'include'
        });

        const { data, message, success, error } = await response.json();

        if ( success )
            setCategoryProduct(data);

        if ( error ) {
            toastr.info(message);
            setCategoryProduct(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {
                    loading ? (
                            categoryLoading.map((item,index)=>{
                                return(
                                    <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                    </div>
                                )
                            })
                    ) : (
                        categoryProduct.map((item, index) => {
                            return (
                                <Link
                                    to={'/producto-categoria?categoria='+item?.category}
                                    className='cursor-pointer'
                                    key={item?.category}
                                >
                                    <div className='w-16 h-16 md:w-16 md:h-16 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                        <img src={item?.image[0]} alt={item?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                    </div>

                                    <p className='text-center text-sm md_text-base capitalize'>{item?.category}</p>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
};

export default CategoryList;