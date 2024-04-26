import React from 'react';
import {IoMdClose} from "react-icons/io";

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded-md max-w-5xl mx-auto p-4'>
                <button className='w-fit ml-auto block text-red-600 text-lg rounded-full hover:bg-red-600 hover:text-white' onClick={onClose}>
                    <IoMdClose />
                </button>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} alt={imgUrl} className='w-full h-full' />
                </div>
            </div>
        </div>
    )
};

export default DisplayImage;