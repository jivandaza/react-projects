import './../../estilos/tarea.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import TareaCartas from './TareaCartas';
import Update from './Update';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import React, { useState } from 'react';


//let id = sessionStorage.getItem('id');

const Tarea = () => {
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
                        } else {
                            toast.success('La tarea se agrego');
                        }
                    })
                    .catch(err => {
                        const { status, data } = err.response;
                        if ( status === 500 ) {
                            toast.error(data.message);
                        }
                    });
            } else {
                setArray([...Array, input]);
                toast.success('La tarea se agrego');
                toast.warning('La tarea no se guardo ! Por favor Registrarse');
                dispatch(authActions.logout());
            }
        }
        setInput({titulo: '', estado: false});
    }
    const updateState = (id) => {
        const titulo = Array[id].titulo;
        if ( Array[id].estado ) {
            toast.info(`${titulo} no se ha realizado`);
        } else {
            toast.info(`${titulo} se ha realizado`);
        }
        Array[id].estado = !Array[id].estado;
        setArray([...Array]);
    }
    const removeTask = (id) => {
        Array.splice(id, 1);
        setArray([...Array]);
    }
    const dis = (value) => {
        document.getElementById("task-update").style.display = value;
    };

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
                                        id={index}
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