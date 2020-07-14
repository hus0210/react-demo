import React from 'react';
import './signin.css'
import LoginForm from '../../components/loginForm/loginForm.jsx'
import { Row, Col } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

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
                    <Col xs={2} sm={4} md={6} lg={8} xl={10} ></Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                        <Title>FNST</Title>
                        <LoginForm onFinish={this.onFinish.bind(this)} onFinishFailed={this.onFinishFailed.bind(this)} />
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10} ></Col>
                </Row>
            </>
        );
    }
}
