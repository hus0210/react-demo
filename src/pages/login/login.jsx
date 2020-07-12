import React from 'react';
import LoginForm from '../../components/loginForm/loginForm.jsx'
import { Row, Col } from 'antd';

export default class Login extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Col span={6}>col</Col>
                    <Col span={12}>
                        <LoginForm />
                    </Col>
                    <Col span={6}>col</Col>
                </Row>
            </>
        );
    }
}
