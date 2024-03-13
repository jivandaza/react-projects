import React from "react";

const Update = ({ display }) => {
    return (
        <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
            <h3>Editar Tarea</h3>
            <input
                type='text'
                placeholder='Introduce un titulo'
                className='task-input my-4 w-100 p-3'
                name='titulo'
            />
            <div>
                <button className='btn btn-primary my-4'>
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