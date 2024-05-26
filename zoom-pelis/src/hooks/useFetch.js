import {useEffect, useState} from 'react';
import axios from 'axios';

const UseFetch = (endpoint) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(endpoint);

            const { results } = response.data;

            //console.log(response);

            setData(results);

            setIsLoading(false);
        }  catch (error) {
            console.error(error.message || error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return {
        data,
        isLoading
    };
};

export default UseFetch;