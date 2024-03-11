import './../../estilos/navbar.css';
import { GiWhiteBook } from 'react-icons/gi';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <b><GiWhiteBook /> &nbsp;Tareas MERN</b>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >Home</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >Acerca De</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >Tareas</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a
                                className="nav-link active btn-nav"
                                aria-current="page"
                                href="#"
                            >Registrarse</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a
                                className="nav-link active btn-nav"
                                aria-current="page"
                                href="#"
                            >Acceder</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a
                                className="nav-link active btn-nav"
                                aria-current="page"
                                href="#"
                            >Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;