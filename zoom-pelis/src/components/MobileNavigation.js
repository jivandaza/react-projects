import React from 'react';
import { NavLink } from 'react-router-dom';
import { mobileNavigation } from '../common/navigation';

const MobileNavigation = () => {
    return (
        <section className='h-14 bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-40'>
            <div className='flex items-center justify-around h-full text-neutral-400'>
                {
                    mobileNavigation.map((nav,index)=>{
                        return(
                            <NavLink
                                key={nav.label+"mobilenavigation"}
                                to={nav.href}
                                className={({isActive})=>`px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}
                            >
                                <div className='text-2xl'>
                                    {nav.icon}
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default MobileNavigation;