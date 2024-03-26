import React from 'react';
import './../styles/AddCar.css';
import { Row, Col, Form, Input, InputNumber } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../redux/actions/carsAction";

const AddCar = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state=>state.alertsReducer)

    const onFinish = (values) => {
        values.bookedTimeSlots = [];

        dispatch(addCar(values));
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center my-5'>
                <Col lg={12} sm={24}>
                    <Form
                        layout='vertical'
                        className='bs1 p-4 frmAddCar'
                        onFinish={onFinish}
                    >
                        <h1 className='text-center'>Add New Car</h1>
                        <hr />

                        <Form.Item
                            name='name'
                            label='Car Name'
                            rules={[{ required: true, message: 'Please input your car name!' }]}
                        >
                            <Input placeholder="Car name" ></Input>
                        </Form.Item>
                        <Form.Item
                            name='image'
                            label='Image Url'
                            rules={[{ required: true, message: 'Please input your image url!' }]}
                        >
                            <Input placeholder="Image url" ></Input>
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
                            <button className='btn1'>ADD CAR</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default AddCar;