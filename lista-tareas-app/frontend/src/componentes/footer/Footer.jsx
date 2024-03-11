import './../../estilos/footer.css';
import React from 'react';

const Footer = () => {
    return (
        <div className='container-fluid p-3 footer text-white'>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <div className='d-flex justify-content-center align-items-center'>
                    <h4 className='m-0'>Tareas MERN </h4>
                    <p className='m-0'>&nbsp; &copy; Jivandaza</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;