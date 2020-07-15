import React from 'react';
import './home.css'
import { Row, Col, Typography, Button, Table } from 'antd';

<<<<<<< HEAD
export default class Home extends React.Component {
    state = {
        visible: new Map()
    };
    firstSelect = false;
=======
const { Title } = Typography;
const { Column } = Table;
>>>>>>> update home page to admin

export default class Home extends React.Component {
    state = {
        dataSource: [
            {
                key: 0,
                name: "1",
                type: "Group",
                children: []
            },
        ]
    }

    onClick(value) {

    }

    onExpand(expanded, record) {
        if(expanded) {
            var dataSource = this.state.dataSource
            dataSource[record.key].children = [
                {
                    key: 0,
                    name: "1",
                    type: "Class",
                }
            ]
            this.setState({
                dataSource: dataSource
            })
        }
    }

    render() {
        return (
            <>
                <Row>
                    <Col span={24}>
                        <Title>FNST</Title>
                    </Col>
                    <Col type="flex" justify="center" align="right"span={23}>
                        <Button type="primary" onClick={this.onClick.bind(this)} >New</Button>
                    </Col>
                    <Col type="flex" justify="center" align="middle" span={24}>
                        <Table dataSource={this.state.dataSource} onExpand={this.onExpand.bind(this)} >
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Type" dataIndex="type" key="type" />
                            <Column title="action" dataIndex="action" key="action" />
                        </Table>
                    </Col>
                </Row>
            </>
        );
    }
}
