import React from 'react';
import './login.css'
import LoginForm from '../../components/loginForm/loginForm.jsx'
import { Row, Col } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

export default class Login extends React.Component {
    onFinish(values) {
        fetch(process.env.REACT_APP_BASE_URL+"/login",{
            method: 'GET',
            mode: 'cors',
        }).then(function(res){
            this.props.history.push('/home')
            console.log(values, res)
        }.bind(this))
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo, );
    }

    render() {
        return (
            <>
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col span={9}></Col>
                    <Col span={6} value={120}>
                        <Title>FNST</Title>
                        <LoginForm onFinish={this.onFinish.bind(this)} onFinishFailed={this.onFinishFailed.bind(this)} />
                    </Col>
                    <Col span={9}></Col>
                </Row>
            </>
        );
    }
}
