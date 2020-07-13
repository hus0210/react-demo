import React from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class LoginForm extends React.Component {
    render() {
        return (
                <Form name="loginForm" {...layout} initialValues={{ remember: true, }} onFinish={this.props.onFinish} onFinishFailed={this.props.onFinishFailed}>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' },]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
        );
    }
};
