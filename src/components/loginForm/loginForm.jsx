import React from 'react';
import './loginForm.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default class LoginForm extends React.Component {
    render() {
        return (
            <Form name="loginForm" initialValues={{ remember: true, }} onFinish={this.props.onFinish} onFinishFailed={this.props.onFinishFailed}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' },]}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};
