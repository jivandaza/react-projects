import './../../estilos/registrarse.css';
import 'react-toastify/dist/ReactToastify.css';
import Titulo from './../titulo/Titulo';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import React, {useState} from 'react';

const Registrarse = () => {
    const history = useNavigate();
    const [Inputs, setInputs] = useState({correo: "", nombreUsuario: "", contrasenia: ""});
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    }
    const submit = async (e) => {
        e.preventDefault();
        // en el hosting en el metodo post se incluye: ${window.location.origin}
        await axios
            .post(`http://localhost:3001/api/v1/registrar`, Inputs)
            .then((response) => {
                toast.success(response.data.message);
                setInputs({correo: '', nombreUsuario: '', contrasenia: ''});
                setTimeout(() => {
                    history("/acceso");
                }, 3000);
            })
            .catch(err => {
                const { status, data } = err.response;
                if ( status === 400) {
                    if ( data.err )
                        toast.error(data.message);
                    if ( data.war )
                        toast.warning(data.message);
                } else if ( status === 500 ) {
                    toast.error(data.message);
                }
            });
    }
    return (
        <div className='signup'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 vh-100 d-flex justify-content-center align-items-center">
                        <div className='d-flex flex-column w-50'>
                            <input
                                className='p-2 mb-3 input-signup'
                                type='email'
                                name='correo'
                                placeholder='Introduce tu correo electrónico'
                                onChange={change}
                                value={Inputs.correo}
                            />
                            <input
                                className='p-2 mb-3 input-signup'
                                type='username'
                                name='nombreUsuario'
                                placeholder='Introduce tu nombre de usuario'
                                onChange={change}
                                value={Inputs.nombreUsuario}
                            />
                            <input
                                className='p-2 mb-3 input-signup'
                                type='password'
                                name='contrasenia'
                                placeholder='Introduce tu contraseña'
                                onChange={change}
                                value={Inputs.contrasenia}
                            />
                            <button
                                className='p-2 btn-signup'
                                onClick={submit}
                            >Registrarse</button>
                        </div>
                    </div>
                    <div className="col-lg-4 vh-100 border-start border-1 border-black d-lg-flex justify-content-center align-items-center d-none">
                        <Titulo
                            primero='Registrar'
                            segundo='Usuario'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registrarse;