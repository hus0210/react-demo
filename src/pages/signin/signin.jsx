import React from 'react';
import './signin.css'
import LoginForm from 'components/loginForm/loginForm.jsx'
import { Row, Col, Result, message } from 'antd';
import Axios from 'axios';

export default class SignIn extends React.Component {
    onFinish(values) {
        Axios.post('/employee/login', {
            eName: values.username,
            ePwd: values.password,
        }).then(function (res) {
            if (res.data.message === "登录成功") {
                message.success("登录成功")
                Axios.post('/sign/signIn', {
                    id: parseInt(this.props.match.params.class)
                }).then(function (res) {
                    if (res.status === 1) {
                        this.render = function () {
                            return (
                                <>
                                    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                                        <Col span={24}>
                                            < Result
                                                status="success"
                                                title="sign in success"
                                                subTitle="success"
                                            />
                                        </Col>
                                    </Row>
                                </>
                            );
                        }
                    } else {
                        this.render = function () {
                            return (
                                <>
                                    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                                        <Col span={24}>
                                            < Result
                                                status="error"
                                                title="sign in error"
                                                subTitle="error"
                                            />
                                        </Col>
                                    </Row>
                                </>
                            );
                        }
                    }
                    this.forceUpdate();
                }.bind(this))
            } else if (res.data.message === "账号不存在") {
                message.error('账号不存在');
            } else if (res.data.message === "密码错误") {
                message.error('密码错误');
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
