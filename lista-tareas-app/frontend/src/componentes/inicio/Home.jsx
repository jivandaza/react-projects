import './../../estilos/home.css';
import React from 'react';

const Home = () => {
    return (
        <div className='home d-flex justify-content-center align-items-center'>
            <div className="container d-flex justify-content-start align-items-start flex-column w-auto">
                <h1 className='text-center'>
                    Organiza tu <br /> trabajo y tu vida por fin.
                </h1>
                <p>
                    Concéntrate, organízate y cálmate con la aplicación de tareas pendientes. <br />
                    La aplicación de gestión de tareas número uno del mundo.
                </p>
                <button className='align-self-end home-btn p-2'>
                    Empezar Tareas
                </button>
            </div>
        </div>
    );
};

export default Home;