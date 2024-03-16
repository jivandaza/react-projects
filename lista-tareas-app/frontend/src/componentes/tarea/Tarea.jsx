import './../../estilos/tarea.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import TareaCartas from './TareaCartas';
import Update from './Update';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import React, { useState, useEffect } from 'react';

const Tarea = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({titulo: "", estado: false});
    const [Array, setArray] = useState([]);

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    const submit = async () => {
        if ( !input.titulo ) {
            toast.error('El titulo no se ingreso');
        } else {
            const id = sessionStorage.getItem('id');
            if ( id ) {
                await axios
                    .post(`http://localhost:3001/api/v2/agregarTarea`, {
                        titulo: input.titulo,
                        estado: input.estado,
                        id: id
                    })
                    .then((response) => {
                        const { message, err } = response.data;

                        if ( err ) {
                            toast.warning(message);
                            dispatch(authActions.logout());
                            sessionStorage.clear('id');
                        } else {
                            toast.success('La tarea se agrego y guardo');
                        }
                    })
                    .catch(err => {
                        const { status, data } = err.response;
                        if ( status === 500 ) {
                            toast.error(data.message);
                        }
                    });
            } else {
                setArray([input, ...Array]);
                toast.success('La tarea se agrego');
                toast.warning('La tarea no se guardo ! Primero debe Registrarse o Acceder');
            }
        }
        setInput({titulo: '', estado: false});
    }
    const updateState = async (cardId) => {
        const id = sessionStorage.getItem('id');

        if ( id ) {
            await axios
                .put(`http://localhost:3001/api/v2/cambiarEstadoTarea/${cardId}`, {
                    id: id
                })
                .then((response) => {
                    Array.splice(cardId, 1);
                    setArray([...Array]);
                    toast.info(response.data.message);
                })
                .catch(err => {
                    const { status, data } = err.response;
                    if ( status === 500 ) {
                        toast.error(data.message);
                    }
                });

        } else {
            const message =
                Array[cardId].estado ? 'La tarea no se realizo' : 'La tarea se realizo';
            toast.info(message);
            toast.warning(`${message} ! Primero debe Registrarse o Acceder`);
            Array[cardId].estado = !Array[cardId].estado;
            setArray([...Array]);
        }
    }
    const removeTask = async (cardId) => {
        const id = sessionStorage.getItem('id');

        if ( id ) {
            await axios
                .delete(`http://localhost:3001/api/v2/removerTarea/${cardId}`, {
                    data: { id: id }
                })
                .then(() => {
                    Array.splice(cardId, 1);
                    setArray([...Array]);
                    toast.error("La tarea se removió y elimino");
                })
                .catch(err => {
                    const { status, data } = err.response;
                    if ( status === 500 ) {
                        toast.error(data.message);
                    }
                });

        } else {
            toast.error('La tarea se removió')
            toast.warning('La tarea no se elimino ! Primero debe Registrarse o Acceder');
            Array.splice(cardId, 1);
            setArray([...Array]);
        }
    }
    const dis = (value) => {
        document.getElementById("task-update").style.display = value;
    };

    useEffect(() => {
        const id = sessionStorage.getItem('id');
        if ( id ) {
            const fetch = async () => {
                await axios
                    .get(`http://localhost:3001/api/v2/obtenerTareas/${id}`)
                    .then((response) => {
                        const { message, err } = response.data;

                        if ( err ) {
                            toast.warning(message);
                            dispatch(authActions.logout());
                            sessionStorage.clear('id');
                            setTimeout(() => history('/acceso'), 3000);
                        } else {
                            setArray(response.data.lista);
                        }
                    })
                    .catch(err => {
                        const { status, data } = err.response;
                        if ( status === 500 ) {
                            toast.error(data.message);
                        }
                    });
            };
            fetch();
        } else{
            dispatch(authActions.logout());
            sessionStorage.clear('id');
        }
    }, [submit]);

    return (
        <>
            <div className='task'>
                <ToastContainer />
                <div className="task-main container d-flex justify-content-center align-items-center my-4">
                    <div className='d-flex flex-column justify-content-center align-items-center py-3 w-50'>
                        <input
                            type='text'
                            placeholder='Titulo'
                            className='task-input p-2 w-100 text-center'
                            name='titulo'
                            value={input.titulo}
                            onChange={change}
                        />
                        <button
                            className='home-btn mt-4 p-2'
                            onClick={submit}
                        >Agregar</button>
                    </div>
                </div>
                <div className="task-body">
                    <div className="conatiner-fluid">
                        <div className="row mb-4">
                            {Array && Array.map((item, index) => (
                                <div
                                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                                    key={index}
                                >
                                    <TareaCartas
                                        titulo={item.titulo}
                                        estado={item.estado}
                                        id={item._id ? item._id : index}
                                        stateCard={updateState}
                                        removeCard={removeTask}
                                        display={dis}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="task-update " id="task-update">
                <div className="container update">
                    <Update display={dis} />
                </div>
            </div>
        </>
    );
}

export default Tarea;