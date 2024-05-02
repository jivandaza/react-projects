import React from 'react';
import CategoryList from './../components/CategoryList';
import BannerProduct from './../components/BannerProduct';
import HorizontalProductCard from "./../components/HorizontalProductCard";

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />

            <HorizontalProductCard />
        </div>
    )
};

export default Home;