import React from 'react';
import LoginForm from '../../components/loginForm/loginForm.jsx'

export default class SignIn extends React.Component {
    onFinish(values) {
        console.log('Success:',values, this.props.match.params.class);
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
