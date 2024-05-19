import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShowProductsOfSearch from '../components/ShowProductsOfSearch';
import productCategory from '../helpers/productCategory';
import summaryApi from '../common';

const CategoryProduct = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("categoria");

    const urlCategoryListObject = {};

    urlCategoryListInArray.forEach(item =>{
        urlCategoryListObject[item] = true
    });

    const [Data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);

    const handleOnChangeSortBy = (e)=>{
        const { value } = e.target;

        setSortBy(value);

        if(value === 'asc')
            setData(previousValue => previousValue.sort((a,b)=>a.sellingPrice - b.sellingPrice));

        if(value === 'dsc')
            setData(previousValue => previousValue.sort((a,b)=>b.sellingPrice - a.sellingPrice));
    };

    const handleSelectCategory = (e) => {
        const { value, checked } =  e.target;

        setSelectCategory((previousValue)=>{
            return{
                ...previousValue,
                [value] : checked
            }
        });
    };

    const fetchData = async () => {
        const response = await fetch(summaryApi.productsByCategory.url, {
            method: summaryApi.productsByCategory.method,
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                category : filterCategoryList
            })
        });

        const { data, success } = await response.json();

        if ( success )
            setData(data);
    };

    useEffect(() => {}, [sortBy]);

    useEffect(()=>{
        fetchData();
    },[filterCategoryList]);

    useEffect(()=>{
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if(selectCategory[categoryKeyName]){
                return categoryKeyName;
            }
            return null;
        }).filter(el => el);

        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map((item, index) => {
            if((arrayOfCategory.length - 1 ) === index  ){
                return `category=${item}`;
            }
            return `category=${item}&&`;
        });

        navigate('/producto-categoria?'+urlFormat.join(''));
    },[selectCategory]);

    return (
        <div className='container mx-auto p-4 min-h-[80vh]'>

            {/**        Version Web Escritorio      **/}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>

                {/**        Lado Izquierdo      **/}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

                    {/**        Ordenar Por      **/}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'
                        >Ordenar Por</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                                <label>Precio - Bajo a Alto</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                                <label>Precio - Alto a Bajo</label>
                            </div>
                        </form>
                    </div>

                    {/**        Filtrar Por      **/}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'
                        >Filtrar Por</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((item, index) => {
                                    return (
                                        <div className='flex items-center gap-3' key={item.value}>
                                            <input type='checkbox' name={'category'} checked={selectCategory[item?.value]} value={item?.value} id={item?.value} onChange={handleSelectCategory} />
                                            <label htmlFor={item?.value}>{item?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>

                </div>

                {/**        Lado Derecho (Mostrar Productos)        **/}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Resultados Busqueda : {Data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            Data.length !== 0 && !isLoading && (
                                <ShowProductsOfSearch
                                    data={Data}
                                    isLoading={isLoading}
                                />
                            )
                        }
                    </div>
                </div>

            </div>

        </div>
    )
};

export default CategoryProduct;