import React, {useState} from 'react';
import { isMobile } from '../helpers/detectDevice';
import MobileNavigation from './MobileNavigation';

const Footer = () => {

    const [showMobile, setShowMobile] = useState(isMobile());

    return (
        showMobile ? (
            <MobileNavigation />
        ) : (
            <div>

            </div>
        )
    );
};

export default Footer;