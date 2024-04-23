import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-36 flex justify-center items-center flex-col py-2'>
                    <div
                        className='text-5xl cursor-pointer flex justify-center'
                    >
                        {
                            user?.profilePic
                                ?   <img
                                    src={user?.profilePic}
                                    alt={user?.name}
                                    className='w-20 h-20 rounded-full'
                                />
                                :   <FaRegCircleUser />
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/**     Navigation     */}
                <div>
                     <nav className='grid p-4'>
                         <Link to='users' className='px-2 py-1 hover:bg-slate-200'>
                             Usuarios
                         </Link>
                         <Link to='products' className='px-2 py-1 hover:bg-slate-200'>
                             Productos
                         </Link>
                     </nav>
                </div>
            </aside>
            <main className='h-full w-full p-4'>
                <Outlet />
            </main>
        </div>
    )
};

export default AdminPanel;