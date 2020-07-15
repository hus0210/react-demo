import React from 'react';
import './signin.css'
import LoginForm from 'components/loginForm/loginForm.jsx'
import { Row, Col, Typography, Result} from 'antd';

const { Title } = Typography;

export default class SignIn extends React.Component {
    onFinish(values) {
        console.log('Success:',values, this.props.match.params.class);
        this.render = function() {
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
        this.forceUpdate()
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
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
        this.forceUpdate()
    }

    render() {
        return (
            <>
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10} ></Col>
                    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                        <LoginForm onFinish={this.onFinish.bind(this)} onFinishFailed={this.onFinishFailed.bind(this)} />
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={8} xl={10} ></Col>
                </Row>
            </>
        );
    }
}
