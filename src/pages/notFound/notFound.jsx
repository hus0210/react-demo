import React from 'react';
import './notFound.css'
import { Result, Button } from 'antd';

export default class NotFound extends React.Component {
    render() {
        return (
            <>
                <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." extra={
                    <Button type="primary" href="/">
                        Log in
                    </Button>
                } />
            </>
        );
    }
}
