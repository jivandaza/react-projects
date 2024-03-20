import axios from 'axios';

export const getAllCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const url_api = 'http://localhost:3001/api/car/getAllCars';
        const response = await axios.get(url_api);

        console.log(response.data);

        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error.message);

        dispatch({ type: 'LOADING', payload: false });
    }
}