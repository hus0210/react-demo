import React from 'react';
import './home.css'
import { Row, Col, Calendar, Badge, Modal } from 'antd';
import Axios from 'axios';

export default class Home extends React.Component {
    state = {
        visible: new Map()
    };
    firstSelect = false;

    async getUserData(date) {
        var res = await Axios.post("/api/sign/showCourse/", {
            eStart: date
        })
        console(res)
        return []
    }

    dateCellRender(value) {
        var data = [];
        if (data.length !== 0) {
            return (
                <>
                    <Badge status='success' />
                    <Modal title="Detail" visible={this.state.visible[value]}>
                        <ul className="events">
                            {data.map(item => (
                                <li key={item.content}>
                                    <Badge status={item.type} text={item.content} />
                                </li>
                            ))}
                        </ul>
                    </Modal>
                </>
            );
        } else {
            return (
                <>
                    <Badge />
                </>
            );
        }
    }

    onPanelChange() {
        this.firstSelect = true
        this.setState({ visible: new Map() })
    }

    onSelect(value) {
        if (this.firstSelect === true) {
            this.firstSelect = false
            return
        }
        var visible = this.state.visible
        visible[value] = !visible[value]
        this.setState({ visible: visible })
    }

    render() {
        return (
            <>
                <Row type="flex" justify="center" style={{ minHeight: '100vh' }}>
                    <Col span={24}>
                        <Calendar fullscreen={false} dateCellRender={this.dateCellRender.bind(this)} onSelect={this.onSelect.bind(this)} onPanelChange={this.onPanelChange.bind(this)} />
                    </Col>
                </Row>
            </>
        );
    }
}
