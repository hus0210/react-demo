import React from 'react';
import './login.css'
import LoginForm from 'components/loginForm/loginForm.jsx'
import { message, Row, Col } from 'antd';
import Axios from 'axios'

export default class Login extends React.Component {
    onFinish(values) {
        Axios.post("/api/employee/login", {
            eName: values.username,
            ePwd: values.password,
        }).then(function (res) {
            console.log(res)
            if (res.message === "登陆成功") {
                message.success("登陆成功")
                this.props.history.push('/home')
            } else if (res.message === "账号不存在") {
                message.error('账号不存在');
            } else if (res.message === "秘密错误") {
                message.error('秘密错误');
            } else {
                message.error('未知错误');
            }
        }.bind(this))
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
