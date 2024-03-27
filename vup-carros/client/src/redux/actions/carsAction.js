import axios from 'axios';
import {message} from "antd";

export const getAllCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = `${window.location.origin}/api/car/getAllCars`;
        const response = await axios.get(url_api);

        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong, please try latter');
        dispatch({ type: 'LOADING', payload: false });
    }
}

export const addCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = `${window.location.origin}/api/car/addCar`;
        await axios.post(url_api, reqObj);

        dispatch({type: 'LOADING' , payload:false});
        message.success('New car added successfully');
        setTimeout(() => {
            window.location.href='/admin'
        }, 3000);
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong, please try latter');
        dispatch({ type: 'LOADING', payload: false });
    }
}

export const editCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = `${window.location.origin}/api/car/editCar`;
        await axios.put(url_api, reqObj);

        dispatch({type: 'LOADING' , payload:false});
        message.success('Car details update successfully');
        setTimeout(() => {
            window.location.href='/admin'
        }, 3000);
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong, please try latter');
        dispatch({ type: 'LOADING', payload: false });
    }
}

export const deleteCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = `${window.location.origin}/api/car/deleteCar`;
        await axios.post(url_api, reqObj);

        dispatch({type: 'LOADING' , payload:false});
        message.success('Car deleted successfully');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong, please try latter');
        dispatch({ type: 'LOADING', payload: false });
    }
}