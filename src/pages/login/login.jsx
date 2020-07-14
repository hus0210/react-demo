import React from 'react';
import './login.css'
import LoginForm from '../../components/loginForm/loginForm.jsx'
import { Row, Col } from 'antd';

export default class Login extends React.Component {
    onFinish(values) {
        fetch(process.env.REACT_APP_BASE_URL).then(function(res){
            console.log(values, res)
        })
        this.props.history.push('/home')
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo, );
    }

    render() {
        return (
            <>
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col span={8}></Col>
                    <Col span={8} value={120}>
                        <LoginForm onFinish={this.onFinish.bind(this)} onFinishFailed={this.onFinishFailed.bind(this)} />
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </>
        );
    }
}
