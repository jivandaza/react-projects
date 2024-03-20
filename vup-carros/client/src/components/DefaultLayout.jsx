import './../styles/DefaultLayout.css';
import React from 'react';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <div className='header bs1'>
                <div className="d-flex justify-content-between">
                    <h1>VUP Cars</h1>
                    <button>User</button>
                </div>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;