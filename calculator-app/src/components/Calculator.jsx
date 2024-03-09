import React from 'react';
import './../styles/calculator.css';

import { btns, BTN_ACTIONS } from "./btnConfig";

const Calculator = () => {
    return(
        <div className='calculator'>
            <div className="calculator__result">
                <div className="calculator__result__exp">

                </div>
                <div className="calculator__result__exp">

                </div>
            </div>
            <div className="calculator__btns">
                {
                    btns.map((item, index) => (
                        <button key={index} className={item.class}>
                            {item.display}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

export default Calculator;