import '../styles/UserBookings.css';
import Spinner from './../components/Spinner';
import DefaultLayout from './../components/DefaultLayout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { getAllBookings } from "../redux/actions/bookingAction";
import moment from 'moment';

const UserBookings = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertsReducer);
    const { bookings } = useSelector(state => state.bookingsReducer);

    useEffect(() => {
        dispatch(getAllBookings());
    }, []);

    const getDateBooking = (date) => {
        return moment(date).format('MMM DD YYYY');
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center'>
                <h1 className='mt-4'>My Bookings</h1>
            </Row>
            <Row justify='center' gutter={16}>
                <Col lg={20} sm={24} xs={20}>
                    {bookings.filter(o => o.user === user._id).map((booking) => {
                        return <Row className='booking-cart bs1 my-4 d-flex align-items-center' gutter={16}>
                            <Col lg={7} sm={24}>
                                <p><b>{booking.car.name}</b></p>
                                <p>Total Hours: <b>{booking.totalHours}</b></p>
                                <p>Total Amount: <b>{booking.totalAmount}</b></p>
                            </Col>
                            <Col lg={10} sm={24}>
                                <p>Transaction Id: <b>{booking.transactionId}</b></p>
                                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                                <p>Date of Booking: <b>{getDateBooking(booking.createdAt)}</b></p>
                            </Col>
                            <Col lg={7} sm={24} className='d-flex justify-content-end'>
                                <img
                                    src={booking.car.image}
                                    alt={booking.car.name}
                                    height='140'
                                    className='p-2'
                                />
                            </Col>
                        </Row>
                    })}
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default UserBookings;