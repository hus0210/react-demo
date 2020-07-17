import React from 'react';
import './statistics.css'
import { Row, Col, Button, Space, DatePicker, Select, Table } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Column } = Table;

export default class Statistics extends React.Component {
    state = {
        dataSource: [],
        groupList: [],
        userList: [],
    }

    start = ""
    end = ""
    group = ""
    user = ""

    onChange(date, dateString) {
        console.log(date, dateString)
        this.setState({ groupList: ["c1", "c2", "c3"], userList: ["u1", "u2", "u3"] })
    }

    onGroupSelectClick() {
        this.setState({ groupList: ["c1", "c2", "c3"] })
    }

    onUserSelectClick() {
        this.setState({ userList: ["u1", "u2", "u3"] })
    }

    render() {
        var pagination = {
            current: 1,
            pageSize: 10,
        }
        return (
            <>
                <Row>
                    <Col type="flex" justify="center" align="middle" span={24}>
                        <Space>
                            <RangePicker onChange={this.onChange.bind(this)} />
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="Group"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onClick={this.onGroupSelectClick.bind(this)}
                            >
                                {this.state.groupList.map(item => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}
                            </Select>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="User"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onClick={this.onUserSelectClick.bind(this)}
                            >
                                {this.state.userList.map(item => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}
                            </Select>
                            <Button type="primary">Search</Button>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Table dataSource={this.state.dataSource} pagination={pagination}>
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Start" dataIndex="start" key="start" />
                            <Column title="End" dataIndex="end" key="end" />
                            <Column title="Class" dataIndex="class" key="class" />
                            <Column title="Teacher" dataIndex="teacher" key="teacher" />
                        </Table>
                    </Col>
                </Row>
            </>
        )
    }
}
