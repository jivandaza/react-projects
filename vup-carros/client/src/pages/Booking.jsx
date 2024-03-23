import './../styles/Booking.css';
import DefaultLayout from './../components/DefaultLayout';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, DatePicker } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import moment from 'moment';
import Spinner from "../components/Spinner";

const { RangePicker } = DatePicker;

const Booking = () => {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const dispatch = useDispatch();
    const history = useNavigate();

    const [car, setCar] = useState({});

    const params = useParams();
    const { carid } = params;



    useEffect(() => {
        if (cars.length  === 0) {
            dispatch(getAllCars());
        } else {
            const foundCar = cars.find(item => item._id === carid);
            if ( foundCar ) {
                setCar(foundCar);
            } else {
                history('/');
            }
        }
    }, [cars, carid]);

    function selectTimeSlots(values) {
        console.log(moment(values[0].$d).format('MMM DD YYYY HH:mm'));
        console.log(moment(values[1].$d).format('MMM DD YYYY HH:mm'));
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center' className='d-flex align-items-center' style={{minHeight: '90vh'}}>
                <Col lg={10} sm={24} xs={24} align='center'>
                    <img
                        src={car.image}
                        alt={`Image of ${car.name}`}
                        className='booking-img img-fluid bs1'
                    />
                </Col>
                <Col lg={10} sm={24} xs={24} className='booking-info'>
                    <Divider plain className='divider'>Car Info</Divider>
                    <div className='car-details'>
                        <p>{car.name}</p>
                        <p>{car.rentPerHour} /- Rent Per Hour</p>
                        <p>Fuel Type: {car.fuelType}</p>
                        <p>Max Person: {car.capacity}</p>
                    </div>

                    <Divider plain className='divider'>Select Time Slots</Divider>
                    <RangePicker
                        format='MMM DD YYYY HH:mm'
                        showTime={{format: 'HH:mm'}}
                        onChange={selectTimeSlots}
                    />
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default Booking;