import React from 'react';
import LoginForm from '../../components/loginForm/loginForm.jsx'

export default class Login extends React.Component {
    onFinish(values) {
        console.log('Success:', values);
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    render() {
        return (
            <LoginForm onFinish={this.onFinish.bind(this)} onFinishFailed={this.onFinishFailed.bind(this)} />
        );
    }
}
