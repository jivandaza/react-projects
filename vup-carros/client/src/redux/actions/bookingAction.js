import axios from 'axios';
import { message } from 'antd';

export const bookCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        if ( reqObj.totalAmount === 0 ) {
            message.warning('Required select time intervals');
        } else {
            const url_api = 'http://localhost:3001/api/booking/bookCar';
            await axios.post(url_api, reqObj);

            message.success('You car booked successfully');

            setTimeout(() => {
                window.location.href = '/mybookings';
            }, 3000);
        }

        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong, please try latter');
        dispatch({ type: 'LOADING', payload: false });
    }
}

export const getAllBookings = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = 'http://localhost:3001/api/booking/getAllBookings';
        const response = await axios.get(url_api);

        dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error.message);

        message.error('Something went wrong, please try latter');
        dispatch({ type: 'LOADING', payload: false });
    }
}