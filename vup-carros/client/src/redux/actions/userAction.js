import axios from 'axios';
import { message } from 'antd';

export const userLogin = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = 'http://localhost:3001/api/user/login';
        const response = await axios.post(url_api, reqObj);

        const { err, msg, user } = response.data;

        if ( err ) {
            message.warning(msg);

        } else {
            localStorage.setItem('user', JSON.stringify(user));
            message.success(msg);

            setTimeout(() => {
                window.location.href = '/';
            },3000);
        }

        setTimeout(() => {
            dispatch({ type: 'LOADING', payload: false });
        },2000);
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong');
        dispatch({ type: 'LOADING', payload: false });
    }
}

export const userRegister = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = 'http://localhost:3001/api/user/register';
        const response = await axios.post(url_api, reqObj);

        const { err, msg, user } = response.data;

        if ( err ) {
            message.warning(msg);

        } else {
            message.success(msg);

            setTimeout(() => {
                window.location.href = '/login';
            },3000);
        }

        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong');
        dispatch({ type: 'LOADING', payload: false });
    }
}