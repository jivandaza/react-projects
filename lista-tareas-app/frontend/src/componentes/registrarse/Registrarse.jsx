import './../../estilos/registrarse.css';
import React from 'react';

const Registrarse = () => {
    return (
        <div className='signup'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 vh-100 d-flex justify-content-center align-items-center">
                        <div className='d-flex flex-column w-50'>
                            <input
                                className='p-2 mb-3 input-signup'
                                type='email'
                                name='correo'
                                placeholder='Introduce tu correo electrónico'
                            />
                            <input
                                className='p-2 mb-3 input-signup'
                                type='username'
                                name='nombre'
                                placeholder='Introduce tu nombre de usuario'
                            />
                            <input
                                className='p-2 mb-3 input-signup'
                                type='password'
                                name='contrasenia'
                                placeholder='Introduce tu contraseña'
                            />
                            <button className='p-2 btn-signup'>Registrarse</button>
                        </div>
                    </div>
                    <div className="col-lg-4 vh-100 border-start border-1 border-black d-flex justify-content-center align-items-center">
                        <h1 className='text-center signup-heading'>
                            Registrar <br /> Se
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registrarse;