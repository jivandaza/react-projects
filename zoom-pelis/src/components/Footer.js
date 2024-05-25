import React from 'react';
import { isMobile } from '../helpers/detectDevice';
import MobileNavigation from './MobileNavigation';
import {Link} from "react-router-dom";

const Footer = () => {

    const showMobile = isMobile();

    return (
        showMobile ? (
            <MobileNavigation />
        ) : (
            <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-2'>
                <div className='flex items-center justify-center gap-4 py-1'>
                    <Link to='/acerca' className='underline' style={{ textUnderlineOffset: '4px'}}
                    >Acerca De</Link>
                    <Link to='/contacto' className='underline' style={{ textUnderlineOffset: '4px'}}
                    >Contacto</Link>
                </div>
                <p className='text-center'>
                    <b>Zoom Pelis</b>
                    &nbsp;&copy;&nbsp;Jivandaza
                </p>
            </footer>
        )
    );
};

export default Footer;