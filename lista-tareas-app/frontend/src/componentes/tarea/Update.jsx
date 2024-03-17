import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

const Update = ({ display, update }) => {

    useEffect(() => {
        setInput({
            titulo: update.titulo,
        });
    }, [update]);

    const [Input, setInput] = useState({
        titulo: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value });
    };

    const submit = async () => {
        if ( !Input.titulo ) {
            toast.error('El titulo no se ingreso');
        } else {
            await axios
                .put(`http://localhost:3001/api/v2/editarTarea/${update._id}`, Input)
                .then((response) => {
                    toast.info(response.data.message);
                    display("none");
                })
                .catch(err => {
                    const { status, data } = err.response;
                    if ( status === 500 ) {
                        toast.error(data.message);
                    }
                });
        }
    };

    return (
        <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
            <h3>Editar Tarea</h3>
            <input
                type='text'
                placeholder='Introduce un titulo'
                className='task-input my-4 w-100 p-3'
                name='titulo'
                value={Input.titulo}
                onChange={change}
            />
            <div>
                <button
                    className='btn btn-primary my-4'
                    onClick={submit}
                >
                    Editar
                </button>
                <button
                    className='btn btn-danger my-4 mx-3'
                    onClick={() => {
                        display('none');
                    }}
                >
                    Salir
                </button>
            </div>
        </div>
    );
}

export default Update;