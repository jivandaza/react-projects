import React from 'react';
import {useParams} from "react-router-dom";

const CategoryProduct = () => {

    const params = useParams();
    const category = params.categoy;

    return (
        <div></div>
    )
};

export default CategoryProduct;