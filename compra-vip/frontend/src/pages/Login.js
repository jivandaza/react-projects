import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useSelector } from "react-redux";
import loginIcon from '../assest/signin.gif';
import toastr from "toastr";
import summaryApi from '../common/index.js';
import Context from '../context/index';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const user = useSelector(state => state?.user?.user);
    const navigation = useNavigate();
    const { fetchUserDetails } = useContext(Context);

    const handleOneChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(summaryApi.signIn.url, {
            method: summaryApi.signIn.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const { message, success, failLogin, error } = await dataResponse.json();

        if ( failLogin ) {
            toastr.warning(message);
        } else if ( error ) {
            toastr.error(message);
        }

        if ( success ) {
            toastr.info(message);
            setTimeout(() => {
                fetchUserDetails();
                navigation('/');
            }, 3000);
        }
    }

    useEffect(() => {
        if ( user ) {
            navigation(-1);
        }
    }, [user, navigation ]);

    return (
        !user && (
            <section id='login'>
                <div className='mx-auto container p-4'>
                    <div
                        className='bg-white p-5 py-5 w-full max-w-md mx-auto rounded-md'
                        style={{
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <div className='w-20 h-20 mx-auto mb-6'>
                            <img src={loginIcon} alt='icono de acceder' className='rounded-full' />
                        </div>
                        <form className='mb-4' onSubmit={handleSubmit}>
                            <div className='grid mb-3'>
                                <label htmlFor='email' className='mb-1'>Correo Electrónico:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={data.email}
                                        placeholder='Ingresar correo electrónico'
                                        onChange={handleOneChange}
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='grid mb-6'>
                                <label htmlFor='password' className='mb-1'>Contraseña:</label>
                                <div className='bg-slate-100 p-2 flex items-center'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        name='password'
                                        value={data.password}
                                        placeholder='Ingresar contraseña'
                                        onChange={handleOneChange}
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
                                <Link
                                    to='/recuperar-contraseña'
                                    className='mt-1 block w-fit ml-auto hover:underline hover:text-red-600'
                                >
                                    Recuperar contraseña
                                </Link>
                            </div>

                            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto block rounded-full hover:scale-110 transition-all hover:bg-red-700'>
                                Acceder
                            </button>
                        </form>
                        <p>
                            ¿No tienes una cuenta?
                            &nbsp;
                            <Link
                                to='/registrarse'
                                className='text-red-600 hover:underline hover:text-red-800'
                            >Registrarse</Link>
                        </p>
                    </div>
                </div>
            </section>
        )
    )
};

export default Login;