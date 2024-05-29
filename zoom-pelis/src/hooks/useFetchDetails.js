import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchDetails = (endpoint) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);

            const response = await axios.get(endpoint);

            setData(response.data);

            setLoading(false);
        } catch (error) {
            console.error(error.message, error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [endpoint]);

    return {
        data,
        loading
    };
};

export default useFetchDetails;