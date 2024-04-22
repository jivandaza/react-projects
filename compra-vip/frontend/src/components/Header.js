import React, { useState } from 'react';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import toastr from "toastr";
import { setUserDetails } from "../store/userSlice";

const Header = () => {

    const [menuDisplay, setMenuDisplay] = useState(false);

    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const dataRequest = await fetch(summaryApi.logout.url, {
            method: summaryApi.logout.method,
            credentials: 'include'
        });

        const { message, success, error } = await dataRequest.json();

        if ( success ) {
            toastr.info(message);
            setTimeout(() => {
                dispatch(setUserDetails(null));
                navigate('/');
            }, 3000);
        }

        if ( error ) {
            toastr.error(message);
        }
    }

    return (
        <div>
            <header className='h-16 shadow-md bg-white'>
                <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                    <div className=''>
                        <Link to=''>
                            <Logo w={90} h={63} />
                        </Link>
                    </div>
                    <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
                        <input
                            type='text'
                            placeholder='Buscar Producto'
                            className='w-full outline-none'
                        />
                        <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer'>
                            <GrSearch />
                        </div>
                    </div>
                    <div className='flex items-center gap-7'>
                        <div className='relative flex justify-center'>
                            <div
                                className='text-3xl relative cursor-pointer flex justify-center'
                                onClick={() => setMenuDisplay(prev => !prev)}
                            >
                                {
                                    user?.profilePic
                                        ?   <img
                                            src={user?.profilePic}
                                            alt={user?.name}
                                            className='w-10 h-10 rounded-full'
                                        />
                                        :   <FaRegCircleUser />
                                }
                            </div>
                            {
                                menuDisplay && (
                                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lh rounded'>
                                        <nav>
                                            <Link to='/admin-panel' className='whitespace-nowrap hover:bg-slate-100 p-2' >
                                                Admin Panel
                                            </Link>
                                        </nav>
                                    </div>
                                )
                            }
                        </div>
                        <div className='text-2xl relative'>
                            <span className='cursor-pointer'><FaShoppingCart /></span>
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                                <p className='text-sm'>0</p>
                            </div>
                        </div>
                        <div>
                            {
                                user?._id
                                    ?   <button
                                            className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
                                            onClick={handleLogout}
                                        >
                                            Salir
                                        </button>
                                    :   <Link to='/acceder'>
                                            <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>
                                                Acceder
                                            </button>
                                        </Link>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
};

export default Header;