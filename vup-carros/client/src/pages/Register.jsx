import './../styles/Login.css';
import 'aos/dist/aos.css';
import { Row, Col, Form, Input } from 'antd';
import Spinner from './../components/Spinner';
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userAction";
import AOS from 'aos';

AOS.init();

const Register = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.alertsReducer);

    const submit = (values) => {
        dispatch(userRegister(values));
    }

    return (
        <div className='login'>
            {loading && <Spinner />}
            <Row gutter={16} className='d-flex align-items-center'>
                <Col lg={16}>
                    <img
                        data-aos='slide-left'
                        data-aos-duration='1500'
                        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className='img-fluid login-img'
                    />
                    <h1 className='login-logo'>VUP Cars</h1>
                </Col>
                <Col lg={8} className='p-5'>
                    <Form
                        layout='vertical'
                        className='login-form p-5'
                        onFinish={submit}
                    >
                        <h1>Register</h1>
                        <hr />
                        <Form.Item
                            name='username'
                            label='Username'
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="Username" ></Input>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                inputProps={{ style: { color: 'white' } }}
                                rootClassName='input-password'
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirmPassword'
                            label='Confirm Password'
                            rules={[{ required: true, message: 'Please input your confirm password!' }]}
                        >
                            <Input.Password
                                placeholder="Confirm password"
                                inputProps={{ style: { color: 'white' } }}
                                rootClassName='input-password'
                            />
                        </Form.Item>
                        <button className='btn1'>Register</button>
                        <br />
                        <Link to='/login'>Click here to Login</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Register;