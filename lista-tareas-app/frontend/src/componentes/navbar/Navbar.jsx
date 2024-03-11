import './../../estilos/navbar.css';
import { GiWhiteBook } from 'react-icons/gi';
import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <b><GiWhiteBook /> &nbsp;Tareas MERN</b>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/"
                            >Inicio</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/acerca"
                            >Acerca De</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/tareas"
                            >Tareas</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link active btn-nav"
                                aria-current="page"
                                to="/registrarse"
                            >Registrarse</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link active btn-nav"
                                aria-current="page"
                                to="/acceso"
                            >Acceder</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link active btn-nav"
                                aria-current="page"
                                to="/cerrarsesion"
                            >Cerrar Sesión</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;