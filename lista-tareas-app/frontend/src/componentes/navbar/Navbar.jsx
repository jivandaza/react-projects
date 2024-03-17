import './../../estilos/navbar.css';
import 'react-toastify/dist/ReactToastify.css';
import { GiWhiteBook } from 'react-icons/gi';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store";
import React from 'react';

const Navbar = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const logout = () => {
        sessionStorage.clear('id');
        dispatch(authActions.logout());
        history('/');
    }
    const collapseNavbar = () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        navbarToggler.classList.add('collapsed');
        navbarToggler.setAttribute('aria-expanded', 'false');
        document.getElementById('navbarSupportedContent').classList.remove('show');;
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link
                    className="navbar-brand"
                    to="/"
                    onClick={collapseNavbar}
                >
                    <b><GiWhiteBook /> &nbsp;Tareas MERN</b>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link link-hover active"
                                aria-current="page"
                                onClick={collapseNavbar}
                                to="/"
                            >Inicio</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link link-hover active"
                                aria-current="page"
                                onClick={collapseNavbar}
                                to="/acerca"
                            >Acerca De</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                className="nav-link link-hover active"
                                aria-current="page"
                                onClick={collapseNavbar}
                                to="/tareas"
                            >Tareas</Link>
                        </li>
                        {!isLoggedIn && (
                            <>
                                <div className='d-flex my-lg-0 my-2'>
                                    <li className="nav-item mx-2">
                                        <Link
                                            className="nav-link active btn-nav p-2"
                                            aria-current="page"
                                            onClick={collapseNavbar}
                                            to="/registrarse"
                                        >Registrarse</Link>
                                    </li>
                                </div>
                                <div className='d-flex my-lg-0 my-2'>
                                    <li className="nav-item mx-2">
                                        <Link
                                            className="nav-link active btn-nav p-2"
                                            aria-current="page"
                                            onClick={collapseNavbar}
                                            to="/acceso"
                                        >Acceder</Link>
                                    </li>
                                </div>
                            </>
                        )}
                        {isLoggedIn && (
                            <div className='d-flex my-lg-0 my-2'>
                                <li
                                    className="nav-item mx-2"
                                    onClick={logout}
                                >
                                    <Link
                                        className="nav-link active btn-nav p-2"
                                        aria-current="page"
                                        onClick={collapseNavbar}
                                        to=""
                                    >Cerrar Sesión</Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;