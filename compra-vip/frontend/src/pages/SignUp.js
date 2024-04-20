import React, { useState } from 'react';
import loginIcon from "../assest/signin.gif";
import imageTobase64 from '../helpers/imageTobase64';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: ''
    });

    const handleOneChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];

        const imagePic = await imageTobase64(file);

        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // code
    }

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div
                    className='bg-white p-5 w-full max-w-md mx-auto rounded-md'
                    style={{
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <div className='w-20 h-20 mx-auto mb-6 relative overflow-hiddern'>
                        <div className='rounded-full'>
                            <img src={data.profilePic || loginIcon} alt='icono de acceder' className='rounded-full w-full h-20' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full rounded-b-full cursor-pointer'>
                                    Cargar foto
                                </div>
                                <input type="file" className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>
                    <form className='mb-4' onSubmit={handleSubmit}>
                        <div className='grid mb-3'>
                            <label htmlFor='name' className='mb-1'>Nombre:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    onChange={handleOneChange}
                                    value={data.name}
                                    placeholder='Ingrese su nombre'
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>
                        <div className='grid mb-3'>
                            <label htmlFor='email' className='mb-1'>Correo Electrónico:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    onChange={handleOneChange}
                                    value={data.email}
                                    placeholder='Ingrese su correo electrónico'
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>
                        <div className='grid mb-3'>
                            <label htmlFor='password' className='mb-1'>Contraseña:</label>
                            <div className='bg-slate-100 p-2 flex items-center'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    name='password'
                                    onChange={handleOneChange}
                                    value={data.password}
                                    placeholder='Ingrese su contraseña'
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={
                                    () => setShowPassword((value) => !value)
                                }>
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='grid mb-6'>
                            <label htmlFor='confirmPassword' className='mb-1'>Confirmar Contraseña:</label>
                            <div className='bg-slate-100 p-2 flex items-center'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    onChange={handleOneChange}
                                    value={data.confirmPassword}
                                    placeholder='Confirme su contraseña'
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={
                                    () => setShowConfirmPassword((value) => !value)
                                }>
                                    <span>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto block rounded-full hover:scale-110 transition-all hover:bg-red-700'>
                            Registrar
                        </button>
                    </form>
                    <p>
                        ¿Ya tienes una cuenta?
                        &nbsp;
                        <Link
                            to='/acceder'
                            className='text-red-600 hover:underline hover:text-red-800'
                        >Acceder</Link>
                    </p>
                </div>
            </div>
        </section>
    )
};

export default SignUp;