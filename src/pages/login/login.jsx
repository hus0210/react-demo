import React from 'react';
import './login.css'
import LoginForm from 'components/loginForm/loginForm.jsx'
import { Row, Col } from 'antd';
import Axios from 'axios';

export default class Login extends React.Component {
    onFinish(values) {
        Axios("/admin/login", {
            aId: values.username,
            aPwd: values.password
        }).then(function (res) {
            console.log(res)
        })
    }

    render() {
        return (
            <>
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10} ></Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                        <LoginForm onFinish={this.onFinish.bind(this)} />
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10} ></Col>
                </Row>
            </>
        );
    }
}
