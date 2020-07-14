import React from 'react';
import './signin.css'
import LoginForm from '../../components/loginForm/loginForm.jsx'
import { Row, Col } from 'antd';

export default class SignIn extends React.Component {
    onFinish(values) {
        console.log('Success:',values, this.props.match.params.class);
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    render() {
        return (
            <>
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <LoginForm onFinish={this.onFinish.bind(this)} onFinishFailed={this.onFinishFailed.bind(this)} />
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </>
        );
    }
}
