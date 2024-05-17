import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import DisplayImage from './DisplayImage';
import productCategory from './../helpers/productCategory';
import uploadImage from "../helpers/uploadImage";
import summaryApi from "../common";
import toastr from "toastr";

const UploadProduct = ({
    onClose,
    allProducts
}) => {

    const [data, setData] = useState({
        name: '',
        brand: '',
        category: '',
        image: [],
        description: '',
        price: '',
        sellingPrice: ''
    });
    const [showFullScreenImage,setShowFullScreenImage] = useState(false);
    const [fullScreenImage,setFullScreenImage] = useState('');

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const handleOneChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        });
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        if ( file ) {
            const uploadImageCloudinary = await uploadImage(file);

            setData((preve)=> {
                return{
                    ...preve,
                    image : [ ...preve.image, uploadImageCloudinary.url]
                }
            });
        }
    };

    const handleDeleteImage = async(index)=> {
        const newImage = [...data.image];
        newImage.splice(index,1);

        setData((preve)=> {
            return{
                ...preve,
                image : [...newImage]
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(summaryApi.uploadProduct.url, {
            method: summaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const { message, success, error } = await response.json();

        if ( success ) {
            toastr.success(message);
            onClose();
            allProducts();
        }

        if ( error ) {
            toastr.info(message);
            dispatch(setUserDetails(null));
            navigation('/');
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 letf-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 shadow-md rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden pb-12'>
                <div className='relative flex items-center py-2'>
                    <h1 className='w-full text-lg font-medium text-center'>Subir Producto</h1>
                    <button className='absolute right-0 p-0.5 text-red-600 text-lg rounded-full hover:bg-red-600 hover:text-white' onClick={onClose}>
                        <IoMdClose />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='grid p-4 overflow-y-scroll h-full pb-8'>
                    <label
                        htmlFor="name"
                        className='mb-2'
                    >Nombre:</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Ingresar nombre'
                        value={data.name}
                        onChange={handleOneChange}
                        className='mb-4 p-2 border rounded-md bg-slate-100 outline-slate-400'
                    />

                    <label
                        htmlFor="brand"
                        className='mb-2'
                    >Marca:</label>
                    <input
                        type='text'
                        id='brand'
                        name='brand'
                        placeholder='Ingresar marca'
                        value={data.brand}
                        onChange={handleOneChange}
                        className='mb-4 p-2 border rounded-md bg-slate-100 outline-slate-400'
                    />

                    <label
                        htmlFor="category"
                        className='mb-2'
                    >Categoría:</label>
                    <select
                        id='category'
                        name='category'
                        className='mb-4 py-2 cursor-pointer border bg-slate-100 outline-slate-400 custom-select'
                        value={data.category}
                        onChange={handleOneChange}
                    >
                        <option value="">Seleccionar categoría</option>
                        {
                            productCategory.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={item.value+index}
                                    >{item.label}</option>
                                )
                            })
                        }
                    </select>

                    <label
                        htmlFor="image"
                        className='mb-2'
                    >Imagen:</label>
                    <label htmlFor="imageInput" className='cursor-pointer mb-2' >
                        <div className='mb-2 p-2 bg-slate-100 border rounded-md h-32 w-full flex justify-center items-center'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-3xl'><FaCloudUploadAlt /></span>
                                <p>Subir imagen</p>
                            </div>
                        </div>
                        <input type="file" id='imageInput' className='hidden' onChange={handleUploadImage} />
                    </label>
                    <div className='mb-4'>
                        {
                            data?.image[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.image.map((item,index)=>{
                                            return(
                                                <div className='relative group'>
                                                    <img
                                                        src={item}
                                                        alt={item}
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={()=>{
                                                            setShowFullScreenImage(true);
                                                            setFullScreenImage(item);
                                                        }}
                                                    />
                                                    <div
                                                        className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer hover:bg-red-700'
                                                        onClick={()=> handleDeleteImage(index)}
                                                    >
                                                        <MdDelete/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Por favor, subir una imagen</p>
                            )
                        }
                    </div>

                    <label
                        htmlFor="price"
                        className='mb-2'
                    >Precio:</label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='Ingresar precio'
                        value={data.price}
                        onChange={handleOneChange}
                        className='mb-4 p-2 border rounded-md bg-slate-100 outline-slate-400'
                    />

                    <label
                        htmlFor="sellingPrice"
                        className='mb-2'
                    >Precio de Venta:</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        name='sellingPrice'
                        placeholder='Ingresar precio de venta'
                        value={data.sellingPrice}
                        onChange={handleOneChange}
                        className='mb-4 p-2 border rounded-md bg-slate-100 outline-slate-400'
                    />

                    <label
                        htmlFor="description"
                        className='mb-2'
                    >Descripción:</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={data.description}
                        placeholder='Ingresar descripción'
                        onChange={handleOneChange}
                        className='h-28 mb-10 p-2 border rounded-md bg-slate-100 outline-slate-400'
                    ></textarea>

                    <button
                        className='px-3 py-2 bg-red-600 text-white hover:bg-red-700'
                        onClick={handleSubmit}
                    >Guardar</button>
                </form>
            </div>

            {/**    Display Full Image   */}
            {
                showFullScreenImage && (
                    <DisplayImage
                        onClose={() => setShowFullScreenImage(false)}
                        imgUrl={fullScreenImage}
                    />
                )
            }
        </div>
    )
};

export default UploadProduct;