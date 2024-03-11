import React from 'react';

const Titulo = ({ primero, segundo }) => {
    return (
        <div>
            <h1 className='text-center signup-heading'>
                {primero} <br /> {segundo}
            </h1>
        </div>
    );
};

export default Titulo;