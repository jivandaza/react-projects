import React, { useEffect, useState } from 'react';
import './../styles/AddCar.css';
import { LeftOutlined } from '@ant-design/icons';
import { Row, Col, Form, Input, InputNumber } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from "react-redux";
import { editCar, getAllCars } from "../redux/actions/carsAction";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditCar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state=>state.alertsReducer);

    const [car, setCar] = useState({});
    const [totalCars, setTotalCars] = useState([]);

    const params = useParams();
    const { carid } = params;

    useEffect(() => {
        if (cars.length  === 0) {
            dispatch(getAllCars());
        } else {
            setTotalCars(cars);
            const foundCar = cars.find(item => item._id === carid);
            if ( foundCar ) {
                setCar(foundCar);
            } else {
                history('/admin');
            }
        }
    }, [cars, carid]);

    const onFinish = (values) => {
        values._id = car._id;

        dispatch(editCar(values));
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center my-5'>
                <Col lg={12} sm={24} xs={20}>
                    {totalCars.length>0 && (
                        <Form
                            layout='vertical'
                            className='bs1 p-4 frmAddCar'
                            initialValues={car}
                            onFinish={onFinish}
                        >
                            <Link to='/admin'>
                                <LeftOutlined style={{
                                    color: 'orangered',
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }} />
                            </Link>
                            <h1 className='text-center'>Edit Car</h1>
                            <hr />

                            <Form.Item
                                name='name'
                                label='Car Name'
                                rules={[{ required: true, message: 'Please input your car name!' }]}
                            >
                                <Input placeholder="Car name"></Input>
                            </Form.Item>
                            <Form.Item
                                name='image'
                                label='Image Url'
                                rules={[{ required: true, message: 'Please input your image url!' }]}
                            >
                                <Input placeholder="Image url"></Input>
                            </Form.Item>
                            <Form.Item
                                name='rentPerHour'
                                label='Rent Per Hour'
                                rules={[{ required: true, message: 'Please input your rent per hour!' }]}
                            >
                                <InputNumber placeholder='0' style={{width: '100%'}} />
                            </Form.Item>
                            <Form.Item
                                name='capacity'
                                label='People Capacity'
                                rules={[{ required: true, message: 'Please input your capacity!' }]}
                            >
                                <InputNumber placeholder='0' style={{width: '100%'}} />
                            </Form.Item>
                            <Form.Item
                                name='fuelType'
                                label='Fuel Type'
                                rules={[{ required: true, message: 'Please input your fuel type!' }]}
                            >
                                <Input placeholder="Fuel type" ></Input>
                            </Form.Item>

                            <div className='text-center'>
                                <button className='btn1'>EDIT CAR</button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default EditCar;