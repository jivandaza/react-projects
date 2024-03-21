import './../styles/Spinner.css';
import { Spin } from 'antd';
import React from 'react';

const Spinner = () => {
    return (
        <div className='spinner'>
            <Spin size='large' />
        </div>
    );
}

export default Spinner;