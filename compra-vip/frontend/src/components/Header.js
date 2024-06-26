import React, {useContext, useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import Logo from './Logo';
import ROLE from './../common/role';
import summaryApi from '../common';
import Context from '../context';
import toastr from 'toastr';

const Header = ({
    isLoading
}) => {

    const location = useLocation();
    const urlSearch = new URLSearchParams(location?.search);
    const searchQuery = urlSearch.getAll('q');

    const [menuDisplay, setMenuDisplay] = useState(false);
    const [search, setSearch] = useState(searchQuery);
    const [visibleSearch, setVisibleSearch] = useState(false);

    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { countProductsOfCart } = useContext(Context);

    const handleLogout = async () => {
        const response = await fetch(summaryApi.logout.url, {
            method: summaryApi.logout.method,
            credentials: 'include'
        });

        const { message, success, error } = await response.json();

        if ( success ) {
            toastr.info(message);
            dispatch(setUserDetails(null));
            navigate('/');
        }

        if ( error )
            toastr.error(message);
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if ( value )
            navigate(`/buscar?q=${value}`);
        else
            navigate('/buscar');
    };

    const handleBtnSearch = () => {
        if ( search )
            navigate(`/buscar?q=${search}`);
        else
            navigate('/buscar');
    };

    useEffect(() => {
        if ( user ) {
            if ( user?.role === ROLE.GENERAL )
                setVisibleSearch(true)
            if ( user?.role === ROLE.ADMIN )
                setVisibleSearch(false)
        } else {
            setVisibleSearch(true)
        }
    }, [user]);

    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to=''>
                        <Logo w={90} h={63} />
                    </Link>
                </div>
                {
                    visibleSearch && !isLoading && (
                        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3'>
                            <input
                                type='text'
                                placeholder='Buscar'
                                className='w-full outline-none'
                                onChange={handleSearch}
                                value={search}
                            />
                            <div
                                className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer'
                                onClick={handleBtnSearch}
                            >
                                <GrSearch />
                            </div>
                        </div>
                    )
                }
                <div className='flex items-center gap-7'>
                    <div className='relative flex justify-center'>
                        {
                            user?._id && (
                                <div
                                    className={`cursor-pointer text-3xl relative flex justify-center`}
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
                            )
                        }
                        {
                            menuDisplay && (
                                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lh rounded'>
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link
                                                    to='/admin-panel/productos'
                                                    className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                                                    onClick={() => setMenuDisplay(false)}
                                                >
                                                    Admin Panel
                                                </Link>
                                            )
                                        }
                                        {
                                            user?.role === ROLE.GENERAL && (
                                                <>
                                                    <Link
                                                        to='/cuenta'
                                                        className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                                                        onClick={() => setMenuDisplay(false)}
                                                    >
                                                        Cuenta
                                                    </Link>
                                                    <Link
                                                        to='/compras'
                                                        className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                                                        onClick={() => setMenuDisplay(false)}
                                                    >
                                                        Compras
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </nav>
                                </div>
                            )
                        }
                    </div>

                    {
                        user?._id && user?.role === ROLE.GENERAL && (
                            <Link to={'/carrito'} className='text-2xl relative'>
                                <span><FaShoppingCart /></span>
                                <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                                    <p className='text-sm'>
                                        {countProductsOfCart}
                                    </p>
                                </div>

                            </Link>
                        )
                    }
                    <div>
                        {
                            isLoading ? (
                                <div className='p-4 w-20 h-full rounded-full bg-slate-200 animate-pulse'></div>
                            ) : (
                                user?._id
                                    ?   <button
                                            className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
                                            onClick={handleLogout}
                                        >Salir</button>
                                    :   <Link to='/acceder'>
                                            <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>
                                                Acceder
                                            </button>
                                        </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;