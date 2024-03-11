import './../../estilos/registrarse.css';
import Titulo from "../titulo/Titulo";
import React from 'react';

const Acceso = () => {
    return (
        <div className='signup'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 vh-100 d-none border-end border-1 border-black d-lg-flex justify-content-center align-items-center">
                        <Titulo
                            primero='Iniciar'
                            segundo='Sesión'
                        />
                    </div>
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
                                type='password'
                                name='contrasenia'
                                placeholder='Introduce tu contraseña'
                            />
                            <button className='p-2 btn-signup'>Acceder</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Acceso;