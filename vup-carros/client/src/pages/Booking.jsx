import './../styles/Booking.css';
import DefaultLayout from './../components/DefaultLayout';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/actions/carsAction';
import { bookCar } from '../redux/actions/bookingAction';
import moment from 'moment';
import Spinner from '../components/Spinner';

const { RangePicker } = DatePicker;
const public_key = 'pk_test_51Oy2zKJuFre07c3eSx9YKFGOrd24vhdcqZgfER40HZzHmh07LzPeLlUNpYldXXDGKk3sphDwgRvqjz57y3nAKuXR00jgq5QBw0'

const Booking = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);

    const [car, setCar] = useState({});
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0);
    const [driver, setDriver] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => {
        if (totalHours !== 0) {
            setTotalAmount((totalHours * car.rentPerHour));
        }

        if ( driver ) {
            setTotalAmount(totalAmount + (30 * totalHours));
        }
    }, [driver, totalHours]);

    function selectTimeSlots(values) {
        if (values && values.length > 0) {
            const momentValue0 = moment(values[0].$d);
            const momentValue1 = moment(values[1].$d);

            setFrom(momentValue0.format('MMM DD YYYY HH:mm'));
            setTo(momentValue1.format('MMM DD YYYY HH:mm'));

            const diffInHours = momentValue1.diff(momentValue0, 'hours');
            setTotalHours(diffInHours);
        }
    }

    function selectDriver(e) {
        if ( e.target.checked )
            setDriver(true);
        else
            setDriver(false);
    }

    function onToken(token) {
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
                from,
                to
            }
        }

        dispatch(bookCar(reqObj));
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
                    <div>
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
                    <br />
                    <button
                        className='btn1 mt-2'
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        See Booked Slots</button>
                    {from && to && (
                        <div>
                            <p>Total Hours: <b>{totalHours}</b></p>
                            <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>
                            <Checkbox onChange={selectDriver}>Driver Required</Checkbox>
                            <h3>Total Amount: {totalAmount}</h3>
                            <StripeCheckout
                                shippingAddress
                                token={onToken}
                                amount={totalAmount * 100}
                                currency='usd'
                                stripeKey={public_key}
                            >
                                <button
                                    className='btn1'
                                >Book Now</button>
                            </StripeCheckout>
                        </div>
                    )}
                </Col>

                {car.name && (
                    <Modal
                        open={showModal}
                        footer={false}
                        title='Booked Time Slots'
                        closable={false}
                    >
                        {car && (<div className='p-2'>
                            {car.bookedTimeSlots.map((slot) => {
                                return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
                            })}

                            <div className='text-right mt-4' style={{textAlign: 'right'}}>
                                <button
                                    className='btn1'
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >Close</button>
                            </div>
                        </div>)}
                    </Modal>
                )}
            </Row>
        </DefaultLayout>
    );
}

export default Booking;