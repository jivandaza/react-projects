import './../styles/Home.css';
import DefaultLayout from './../components/DefaultLayout';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from 'antd';
import { getAllCars } from '../redux/actions/carsAction.js';

const Home = () => {
    const { cars, loading } = useSelector(state => state.carsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCars())
    }, []);

    return (
        <DefaultLayout>
            <Row justify='center' gutter={16}>
                {cars.map((car) => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img
                                src={car.image}
                                className='car-img'
                                alt={'Image of ' + car.name}
                            />

                            <div className="car-content d-flex">
                                <div>
                                    <p>{car.name}</p>
                                    <p>{car.rentPerHour} Rent Per Hour /-</p>
                                </div>
                            </div>

                            <div>
                                <button>Book Now</button>
                            </div>
                        </div>

                    </Col>
                })}
            </Row>
        </DefaultLayout>
    );
}

export default Home;