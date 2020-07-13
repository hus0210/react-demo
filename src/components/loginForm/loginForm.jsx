import React from 'react';
import { Form, Input, Button} from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class LoginForm extends React.Component {
    onFinish(values) {
        console.log('Success:', values);
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    render() {
        return (
            <Form name="loginForm" {...layout} initialValues={{ remember: true, }}
                onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}
            >
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!'}]} >
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!'}, ]}>
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
