import React, {useState, useEffect, useContext} from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { FaAngleLeft } from 'react-icons/fa6';
import { isMobile } from '../helpers/detectDevice';
import { navigation } from '../common/navigation';
import logo from '../assets/logo192.png';
import userIcon from '../assets/user.png';
import { SearchContext } from "../context/SearchContext";

const Header = () => {

    const location = useLocation();

    const query = location?.search?.slice(3);

    const navigate = useNavigate();

    const { showSearch, setShowSearch } = useContext(SearchContext);

    const handleSubmit = (e)=> {
        e.preventDefault();

        if ( isMobile() ) {
            setShowSearch(true);
            navigate(`/buscar`);
        }
    };

    return (
        <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
            <div className='container mx-auto px-3 flex items-center h-full'>

                {
                    showSearch ? (
                        <>
                            <Link
                                to={'/'}
                                className='bg-transparent text-white p-2 active:bg-neutral-400 text-lg cursor-pointer mr-2'
                                onClick={() => setShowSearch(false)}
                            >
                                <FaAngleLeft />
                            </Link>
                            <input
                                type='text'
                                placeholder='Buscar...'
                                className='bg-transparent px-4 py-1 outline-none border-none w-full'
                                onChange={(e)=> navigate(`/buscar?q=${e.target.value}`)}
                                value={query?.split("%20")?.join(" ")}
                            />
                        </>
                    ) : (
                        <>
                            {/**        Logo        **/}
                            <Link to={'/'} className='flex justify-between items-center' >
                                <img src={logo} alt={'logo'} width={40} height={40} />
                                <h2 className='text-white text-xl tracking-wide font-medium bg-opacity-50'>Zoom Pelis</h2>
                            </Link>

                            {/**        Navegación      **/}
                            <nav className='hidden lg:flex items-center gap-1 ml-5'>
                                {
                                    navigation.map((item,index)=>{
                                        return(
                                            <div key={item.label+"header"+index}>
                                                <NavLink
                                                    to={item.href}
                                                    className={({isActive})=>`px-2 py-1 hover:text-neutral-100 hover:underline transition duration-300 ease-in-out ${isActive && "text-neutral-200"}`}
                                                    style={{ textUnderlineOffset: '4px'}}
                                                >
                                                    {item.label}
                                                </NavLink>
                                            </div>
                                        )
                                    })
                                }
                            </nav>

                            <div className='ml-auto flex items-center gap-5'>

                                {/**        Buscador        **/}
                                <form
                                    className='flex items-center gap-2'
                                >
                                    <input
                                        type='text'
                                        placeholder='Buscar...'
                                        className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                                        onChange={(e)=> navigate(`/buscar?q=${e.target.value}`)}
                                        value={query?.split("%20")?.join(" ")}
                                    />
                                    <button className='text-2xl text-white' onClick={handleSubmit} >
                                        <IoSearchOutline/>
                                    </button>
                                </form>

                                {/**        Icono Usuario         **/}
                                <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                                    <img
                                        src={userIcon}
                                        className='w-full h-full'
                                        alt={'Icono Usuario'}
                                    />
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </header>
    );
};

export default Header;