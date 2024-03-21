import './../styles/Home.css';
import Spinner from "../components/Spinner";
import DefaultLayout from './../components/DefaultLayout';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from 'antd';
import { getAllCars } from '../redux/actions/carsAction.js';

const Home = () => {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCars())
    }, []);

    return (
        <DefaultLayout>

            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16} className='mt-5'>
                {cars.map((car) => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img
                                src={car.image}
                                className='car-img'
                                alt={'Image of ' + car.name}
                            />

                            <div className="car-content d-flex justify-content-between align-items-center">
                                <div>
                                    <p>{car.name}</p>
                                    <p>{car.rentPerHour} Rent Per Hour /-</p>
                                </div>
                                <div>
                                    <button className='btn1 mr-2'>Book Now</button>
                                </div>
                            </div>
                        </div>

                    </Col>
                })}
            </Row>
        </DefaultLayout>
    );
}

export default Home;