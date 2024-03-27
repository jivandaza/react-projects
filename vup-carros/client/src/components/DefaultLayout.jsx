import './../styles/DefaultLayout.css';
import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Col } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";

const DefaultLayout = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <div className='header bs1'>
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between">
                            <h1><Link to='/'>VUP Cars</Link></h1>

                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                            >
                                <Button><UserOutlined /> {user.username}</Button>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="footer bs1">
                <p className='text-center p-2'>Designed and Developer by</p>
                <p className='text-center pb-1'>VUP Cars & Jivandaza</p>
            </div>
        </div>
    );
}

const items = [
    {
        key: '1',
        label: (
            <a href='/' style={{textDecoration: "none"}}>
                Home
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a href='/mybookings' style={{textDecoration: "none"}}>
                My Bookings
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a href='/admin' style={{textDecoration: "none"}}>
                Panel Admin
            </a>
        ),
    },
    {
        key: '4',
        danger: true,
        label: (
            <a href='/login' style={{textDecoration: "none"}} onClick={() => {
                localStorage.removeItem('user');
            }}>
                Logout
            </a>
        ),
    }
];

export default DefaultLayout;