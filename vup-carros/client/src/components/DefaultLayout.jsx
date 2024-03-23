import './../styles/DefaultLayout.css';
import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Col } from 'antd';
import React from 'react';

const DefaultLayout = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <div className='header bs1'>
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between">
                            <h1>VUP Cars</h1>

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
            <a href="/" style={{textDecoration: "none"}}>
                Booking
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a href="" style={{textDecoration: "none"}}>
                Profile
            </a>
        ),
    },
    {
        key: '4',
        danger: true,
        label: (
            <li onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login';
            }}>
                Logout
            </li>
        ),
    }
];

export default DefaultLayout;