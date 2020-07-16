import React from 'react';
import './home.css'
import { Row, Col, Calendar, Badge, Modal } from 'antd';
import Axios from 'axios';

export default class Home extends React.Component {
    state = {
        badges: new Map(),
        visibles: new Map(),
        list: [],
    };
    lists = new Map()
    firstSelect = false;
    count = 0;

    async getData(date) {
        var list = []
        await Axios.post('/sign/showCourse/', {
            eId: parseInt(this.props.match.params.eid),
            cStart: '2020-7-14',
        }).then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                var status = "warning";
                if (res.data[i].signState === 1) {
                    status = "success"
                } else {
                    status = "error"
                }
                list.push({
                    status: status,
                    text: res.data[i].course.cStart + "~" + res.data[i].course.cEnd + ":" + res.data[i].course.cClass + ":" + res.data[i].course.cName + ":" + res.data[i].course.cTeacher
                })
            }
        })
        return list
    }

    dateCellRender(date) {
        if (this.count++ < 42) {
            this.getData().then(function (list) {
                var badges = this.state.badges
                var visibles = this.state.visibles
                if (list.length) {
                    visibles[date] = false
                    this.lists[date] = list
                    badges[date] = <>
                        <Badge status='success' />
                    </>
                } else {
                    badges[date] = <>
                        <Badge status='' />
                    </>
                }
                this.setState({
                    badges: badges,
                    visibles: visibles
                })
            }.bind(this))
        }
        return (
            <>
                {this.state.badges[date]}
                <Modal title="Detail" visible={this.state.visibles[date]}>
                    <ul className="events">
                        {this.state.list.map(item => (
                            <li key={item.text}>
                                <Badge status={item.state} text={item.text} />
                            </li>
                        ))}
                    </ul>
                </Modal>
            </>
        )
    }

    onPanelChange() {
        this.firstSelect = true
        this.count = 0
        this.setState({ modals: new Map(), visibles: new Map() })
    }

    onSelect(date) {
        if (this.firstSelect === true) {
            this.firstSelect = false
            return
        }
        if (this.state.visibles[date] !== undefined) {
            var visibles = this.state.visibles
            visibles[date] = !visibles[date]
            this.setState({ visibles: visibles, list: this.lists[date] })
        }
    }

    render() {
        if (this.props.match.params.eld === "") {
            this.props.history.push('/login');
        }
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
