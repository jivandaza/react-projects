import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-slate-200' style={{
            boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className='container mx-auto p-4'>
                <p className='text-center'>
                    <b>Compra VIP</b>
                    &nbsp;&copy;&nbsp;Jivandaza
                </p>
            </div>
        </footer>
    )
};

export default Footer;