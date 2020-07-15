import React from 'react';
import './home.css'
import { Row, Col, Typography, Button, Table, Space } from 'antd';

const { Title } = Typography;
const { Column } = Table;

export default class Home extends React.Component {
    state = {
        groupDataSource: [
            {
                key: 0,
                name: "1",
                type: "Group",
            },
        ],
    }

    expandedRowRender(record) {
        var classDataSource = [
            {
                key: 0,
                name: "11",
                detail: "class 11"
            },
            {
                key: 1,
                name: "12",
                detail: "class 12"
            }
        ]

        return(
            <Table dataSource={classDataSource} pagination={false}>
                <Column title="Name" dataIndex="name" key="name"/>
                <Column title="Detail" dataIndex="detail" key="detail"/>
                <Column title="Action" dataIndex="action" key="action" render={
                    function (_, record){
                        return(
                            <Space size="middle">
                                <Button type="primary" onClick={this.onEditClick.bind(this, record)}>Edit</Button>
                                <Button type="primary" onClick={this.onDeleteClick.bind(this, record)}>Delete</Button>
                            </Space>
                        )
                    }.bind(this)
                }/>
            </Table>
        )
    }

    onNewClick() {

    }

    onAddClick(record) {
        console.log(record)
    }

    onEditClick(record) {
        console.log(record)
    }

    onDeleteClick(record) {
        console.log(record)
    }



    render() {
        var pagination = {
            current: 1,
            pageSize: 10,
        }
        return (
            <>
                <Row>
                    <Col span={24}>
                        <Title>FNST</Title>
                    </Col>
                    <Col type="flex" justify="center" align="right"span={23}>
                        <Button type="primary" onClick={this.onNewClick.bind(this)}>New</Button>
                    </Col>
                    <Col type="flex" justify="center" align="middle" span={24}>
                        <Table dataSource={this.state.groupDataSource} expandedRowRender={this.expandedRowRender.bind(this)} pagination={pagination}>
                            <Column title="Name" dataIndex="name" key="name"/>
                            <Column title="Action" dataIndex="action" key="action" render={
                                function (_, record) {
                                    return (
                                        <Space size="middle">
                                            <Button type="primary" onClick={this.onAddClick.bind(this, record)}>Add</Button>
                                            <Button type="primary" onClick={this.onDeleteClick.bind(this, record)}>Delete</Button>
                                        </Space>
                                    )
                                }.bind(this)
                            }/>
                        </Table>
                    </Col>
                </Row>
            </>
        );
    }
}
