import React from 'react';
import './home.css'
import { Row, Col, Calendar, Badge, Modal } from 'antd';

export default class Home extends React.Component {
    state = { visible: new Map() };

    getListData(value) {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' },
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    { type: 'success', content: 'This is very long usual event。。....' },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    dateCellRender(value) {
        var listData = this.getListData(value);

        if (listData.length !== 0) {
            return (
                <>
                    <Badge status='success'/>
                    <Modal title="Detail" visible={this.state.visible[value]}>
                        <ul className="events">
                            {listData.map(item => (
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

    onSelect(value) {
        var visible = this.state.visible
        visible[value] = !visible[value]
        this.setState({ visible: visible })
    }

    render() {
        return (
            <>
                <Row type="flex" justify="center" style={{ minHeight: '100vh' }}>
                    <Col span={24}>
                        <Calendar fullscreen={false} dateCellRender={this.dateCellRender.bind(this)} onSelect={this.onSelect.bind(this)} />
                    </Col>
                </Row>
            </>
        );
    }
}
