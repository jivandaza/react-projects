import './../../estilos/registrarse.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import Titulo from "../titulo/Titulo";
import React, {useState} from 'react';

const Acceso = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [Inputs, setInputs] = useState({correoFrm: "", contraseniaFrm: ""});
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    }
    const submit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${window.location.origin}/api/v1/acceso`, Inputs)
            .then((response) => {
                const { message, err, user } = response.data;

                if ( err ) {
                    toast.warning(message);
                } else {
                    toast.success(message);
                    sessionStorage.setItem('id', user._id);
                    dispatch(authActions.login());
                    setInputs({correoFrm: '', contraseniaFrm: ''});
                    setTimeout(() => {
                        history('/tareas');
                    }, 3000);
                }
            })
            .catch(err => {
                const { status, data } = err.response;

                if ( status === 400) {
                    toast.error(data.message);
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
                    <div className="col-lg-4 vh-100 d-none border-end border-1 border-black d-lg-flex justify-content-center align-items-center">
                        <Titulo
                            primero='Iniciar'
                            segundo='Sesión'
                        />
                    </div>
                    <div className="col-lg-8 vh-100 d-flex justify-content-center align-items-center">
                        <div className='d-flex flex-column mx-2'>
                            <input
                                className='p-2 mb-3 input-signup'
                                type='email'
                                name='correoFrm'
                                placeholder='Correo electrónico'
                                onChange={change}
                                value={Inputs.correoFrm}
                            />
                            <input
                                className='p-2 mb-3 input-signup'
                                type='password'
                                name='contraseniaFrm'
                                placeholder='Contraseña'
                                onChange={change}
                                value={Inputs.contraseniaFrm}
                            />
                            <button
                                className='p-2 btn-signup'
                                onClick={submit}
                            >Acceder</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Acceso;