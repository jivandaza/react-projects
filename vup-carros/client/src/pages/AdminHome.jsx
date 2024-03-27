import './../styles/Home.css';
import Spinner from "../components/Spinner";
import DefaultLayout from './../components/DefaultLayout';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAllCars, deleteCar } from '../redux/actions/carsAction.js';

const AdminHome = () => {
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

    return (
        <DefaultLayout>
            <Row justify='center' gutter={16}>
                <Col lg={20} sm={24} xs={22} className='text-end mt-2'>
                    <Link to='/addcar'><button className='btn1'>Add Car</button></Link>
                </Col>
            </Row>

            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16}>
                {totalCars.map((car, index) => {
                    return <Col lg={5} sm={24} xs={24} key={index}>
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
                                    <Link to={`/editcar/${car._id}`}>
                                        <EditOutlined className='me-2' style={{color: 'cornflowerblue', fontSize: 20, cursor: 'pointer'}} />
                                    </Link>
                                    <Popconfirm
                                        title="Delete the car"
                                        description="Are you sure to delete this car?"
                                        onConfirm={() => {
                                            dispatch(deleteCar({carid: car._id}));
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{color: 'red', fontSize: 20, cursor: 'pointer'}} />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>

                    </Col>
                })}
            </Row>
        </DefaultLayout>
    );
}

export default AdminHome;