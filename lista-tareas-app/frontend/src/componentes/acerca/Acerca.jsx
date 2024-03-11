import './../../estilos/acerca.css';
import React from 'react';

const Acerca = () => {
    return (
        <div className='about d-flex justify-content-center align-items-center'>
            <div className="container">
                <div className='d-flex justify-content-center align-items-center'>
                    <h1>Acerca De</h1>
                </div>
                <p>
                    Tareas MERN es una aplicación de gestión de tareas diseñada para ayudarte a organizar tu vida diaria de manera eficiente y mantener un control efectivo de tus responsabilidades. Esta aplicación ofrece una interfaz intuitiva y características poderosas para que puedas planificar, priorizar y completar tus tareas de manera efectiva.
                    <br /> <br />
                    Con Tareas MERN, puedes transformar la complejidad de tus responsabilidades diarias en una experiencia gestionable y organizada. Ya sea para el trabajo, los estudios o la vida cotidiana, TaskMaster está diseñado para ser tu compañero confiable en la gestión de tareas, facilitando la planificación y ejecución de tus objetivos.
                </p>
            </div>
        </div>
    );
}

export default Acerca;