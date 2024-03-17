import { FaRegEdit } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci"
import React from 'react';

const TareaCartas = ({
    titulo,
    estado,
    id,
    stateCard,
    removeCard,
    display,
    updateId,
    toBeUpdate
}) => {
    return (
        <div className='p-3 task-card'>
            <div className='d-flex justify-content-center'>
                <h5
                    className={`text-center p-2 ${estado ? 'task-completed' : ''}`}
                    onClick={(e) => {
                        stateCard(id);
                    }}
                >{titulo}</h5>
            </div>
            <div className='d-flex justify-content-around'>
                {!estado && (
                    <div
                        className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1'
                        onClick={() => {
                            display('block');
                            toBeUpdate(updateId);
                        }}
                    >
                        <FaRegEdit className='card-icons' /> Editar
                    </div>
                )}
                <div
                    className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger'
                    onClick={() => {
                        removeCard(id);
                    }}
                >
                    <CiSquareRemove
                        className='card-icons del'
                    /> Remover
                </div>
            </div>
        </div>
    );
};

export default TareaCartas;