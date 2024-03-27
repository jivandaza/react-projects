import './../styles/Home.css';
import Spinner from "../components/Spinner";
import DefaultLayout from './../components/DefaultLayout';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getAllCars } from '../redux/actions/carsAction.js';

const { RangePicker } = DatePicker;

const Home = () => {
    const dispatch = useDispatch();

    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);

    const [totalCars, setTotalCars] = useState([]);

    useEffect(() => {
        dispatch(getAllCars())
    }, []);

    useEffect(() => {
        setTotalCars(cars);
    }, [cars]);

    function setFilter(values) {
        if ( values ) {
            let temp = [];
            let selectedFrom = moment(values[0].$d, 'MMM DD YYYY HH:mm');
            let selectedTo = moment(values[1].$d, 'MMM DD YYYY HH:mm');
            let carsAdded = new Set();

            for (let car of cars) {
                if (!car.bookedTimeSlots.length) {
                    temp.push(car);
                    carsAdded.add(car.id);
                } else {
                    let shouldAddCar = true;
                    for (let booking of car.bookedTimeSlots) {
                        if (
                            selectedFrom.isBetween(booking.from, booking.to) ||
                            selectedTo.isBetween(booking.from, booking.to) ||
                            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                            moment(booking.to).isBetween(selectedFrom, selectedTo)
                        ) {
                            shouldAddCar = false;
                            break;
                        }
                    }
                    if (shouldAddCar && !carsAdded.has(car.id)) {
                        temp.push(car);
                        carsAdded.add(car.id);
                    }
                }
            }

            setTotalCars(temp);

        } else {
            setTotalCars(cars);
        }
    }

    return (
        <DefaultLayout>

            <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24} className='d-flex justify-content-end'>
                    <RangePicker
                        format='MMM DD YYYY HH:mm'
                        showTime={{format: 'HH:mm'}}
                        onChange={setFilter}
                    />
                </Col>
            </Row>

            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16}>
                {totalCars.map((car, index) => {
                    return <Col lg={5} sm={24} xs={20} key={index}>
                        <div className='car p-2 bs1'>
                            <img
                                src={car.image}
                                className='car-img'
                                alt={'Image of ' + car.name}
                            />

                            <div className="car-content d-flex justify-content-between align-items-center">
                                <div>
                                    <p>{car.name}</p>
                                    <p>Rent Per Hour {car.rentPerHour} /-</p>
                                </div>
                                <div>
                                    <button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
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