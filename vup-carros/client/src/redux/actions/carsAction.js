import axios from 'axios';
import {message} from "antd";

export const getAllCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = 'http://localhost:3001/api/car/getAllCars';
        const response = await axios.get(url_api);

        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong, please try latter');
        dispatch({ type: 'LOADING', payload: false });
    }
}