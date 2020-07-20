import React from 'react';
import './statistics.css'
import { Row, Col, Button, Space, DatePicker, Select, Table } from 'antd';
import Axios from 'axios';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Column } = Table;

export default class Statistics extends React.Component {
    state = {
        dataSource: [],
        groupList: [],
        userList: [],
    }

    userInput = {
        date: [],
        gid: -1,
        uid: -1,
    }

    onChange(_, dateString) {
        this.userInput.date = dateString
    }

    onGroupSelectClick() {
        Axios.post("/course/getAllGroup").then(function (res) {
            var list = []
            res.data.forEach(item => {
                list[item.gId] = item.gName
            });
            this.setState({ groupList: list })
        }.bind(this))
    }

    onGroupSelectChange(value) {
        this.userInput.gid = this.state.groupList.indexOf(value)
    }

    onUserSelectClick() {
        Axios.post("/course/getAllEmployee").then(function (res) {
            var list = []
            res.data.forEach(item => {
                list[item.eId] = item.eName
            });
            this.setState({ userList: list })
        }.bind(this))
    }

    onUserSelectChange(value) {
        this.userInput.uid = this.state.userList.indexOf(value)
    }

    onSearchClick() {
        Axios.post('/sign/querySign', {
            cGroup: this.userInput.gid,
            eId: this.userInput.uid,
            cStart: this.userInput.date[0] + " 00:00:00",
            cEnd: this.userInput.date[1] + " 23:59:59",
        }).then(function (res) {
            var dataSource = []
            dataSource.push({
                key: 0,
                total: res.data.courseNum,
                current: res.data.attendNum,
                percent: res.data.attendPercent,
            })
            this.setState({ dataSource: dataSource })
        }.bind(this))
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
                                onChange={this.onGroupSelectChange.bind(this)}
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
                                onChange={this.onUserSelectChange.bind(this)}
                            >
                                {this.state.userList.map(item => (
                                    <Option key={item} value={item}>{item}</Option>
                                ))}
                            </Select>
                            <Button type="primary" onClick={this.onSearchClick.bind(this)}>Search</Button>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Table dataSource={this.state.dataSource} pagination={pagination}>
                            <Column title="Total" dataIndex="total" key="total" />
                            <Column title="Current" dataIndex="current" key="current" />
                            <Column title="Percent" dataIndex="percent" key="percent" />
                        </Table>
                    </Col>
                </Row>
            </>
        )
    }
}
