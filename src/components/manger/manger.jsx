import React from 'react';
import './manger.css'
import { Row, Col, Button, Table, Space, Input, Modal, DatePicker, TimePicker, Checkbox, message } from 'antd';
import Axios from 'axios';

const { Column } = Table;

export default class Manger extends React.Component {
    state = {
        groupDataSource: [],
        classDataSource: [],
        newVisible: false,
        addVisible: false,
        indeterminate: true,
        checkedAll: false,
        checkedList: ["Mon", "Tue", "Wed", "Thu", "Fri"]
    }
    options = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    userInput = {
        record: {},
        group: "",
        class: "",
        teacher: "",
        date: [],
        time: [],
    }

    // group
    onNewClick() {
        this.setState({ newVisible: true })
    }

    onNewChange(event) {
        this.userInput.group = event.target.value
    }

    async onNewOk() {
        var dataSource = [...this.state.groupDataSource]
        await Axios.post("/course/insertGroup", {
            gName: this.userInput.group
        }).then(function (res) {
            message.success("Create group success")
            dataSource.push(
                {
                    key: res.data.gId,
                    no: res.data.gId,
                    group: res.data.gName,
                },
            )
        })
        this.setState({ newVisible: false, groupDataSource: dataSource })
    }

    onNewCancle() {
        this.setState({ newVisible: false })
    }

    onDeleteGroupClick(record) {
        var dataSource = [...this.state.groupDataSource]
        dataSource.splice(dataSource.indexOf(record), 1)
        this.setState({ groupDataSource: dataSource })
    }

    // class
    onAddClick(record) {
        this.userInput.record = record
        this.setState({ addVisible: true })
    }

    onAddClassChange(event) {
        this.userInput.class = event.target.value
    }

    onAddTeacherChange(event) {
        this.userInput.teacher = event.target.value
    }

    onAddDateChange(_, date) {
        this.userInput.date = date
    }

    onAddTimeChange(_, time) {
        this.userInput.time = time
    }

    onAddCheckAllChange() {
        if (this.state.checkedAll) {
            this.setState({ checkedList: [], checkedAll: false, indeterminate: false })
        } else {
            this.setState({ checkedList: this.options, checkedAll: true, indeterminate: false })
        }
    };

    onAddCheckChange(checkedList) {
        if (checkedList.length === this.options.length) {
            this.setState({ checkedAll: true, indeterminate: false })
        } else if (checkedList.length === 0) {
            this.setState({ checkedAll: false, indeterminate: false })
        } else {
            this.setState({ checkedAll: false, indeterminate: true })
        }
        this.setState({ checkedList: checkedList })
    };

    onAddOk() {
        // build ajax params
        var week = []
        this.options.forEach(item => {
            if (this.state.checkedList.indexOf(item) === -1) {
                week.push(false)
            } else {
                week.push(true)
            }
        });
        var start = new Date(this.userInput.date[0])
        var end = new Date(this.userInput.date[1])
        var paramList = []
        for (; start <= end; start = new Date(start.setDate(start.getDate() + 1))) {
            if (week[start.getDay()]) {
                paramList.push({
                    cGroup: this.userInput.record.no,
                    cName: this.userInput.record.group,
                    cClass: this.userInput.class,
                    cStart: this.userInput.date[0] + " " + this.userInput.time[0],
                    cEnd: this.userInput.date[1] + " " + this.userInput.time[1],
                    cTeacher: this.userInput.teacher,
                })
            }
        }
        // send ajax request
        Axios.post("/course/insertAllCourses", paramList).then(function (res) {
            var dataSource = this.state.classDataSource
            if (dataSource[this.userInput.record] === undefined) {
                dataSource[this.userInput.record] = []
            } else {
                dataSource[this.userInput.record] = [...dataSource[this.userInput.record]]
            }
            // add to classDataSource
            res.data.forEach(item => {
                dataSource[this.userInput.record].push({
                    key: item.cId,
                    no: item.cId,
                    class: item.data,
                    teacher: item.cTeacher,
                    start: item.cStart,
                    end: item.cEnd
                })
            });
            // set state
            this.setState({ addVisible: false, classDataSource: dataSource })
        }.bind(this))
    }

    onAddCancle() {
        this.setState({ addVisible: false })
    }

    onDeleteClassClick(record) {
        var dataSource = [...this.state.classDataSource]
        dataSource.splice(dataSource.indexOf(record), 1)
        this.setState({ classDataSource: dataSource })
    }

    onGenClick(record) {
        console.log(record)
    }

    // children table
    expandedRowRender(record) {
        console.log(this.state.classDataSource)
        return (
            <Table dataSource={this.state.classDataSource[record]} pagination={false}>
                <Column title="No" dataIndex="no" key="no" />
                <Column title="Class" dataIndex="class" key="class" />
                <Column title="Teacher" dataIndex="teacher" key="teacher" />
                <Column title="Start" dataIndex="start" key="start" />
                <Column title="End" dataIndex="end" key="end" />
                <Column title="Action" dataIndex="action" key="action" render={
                    function (_, record) {
                        return (
                            <Space size="middle">
                                <Button type="primary" onClick={this.onDeleteClassClick.bind(this, record)}>Delete</Button>
                                <Button type="primary" onClick={this.onGenClick.bind(this, record)}>Gen</Button>
                            </Space>
                        )
                    }.bind(this)
                } />
            </Table>
        )
    }

    render() {
        if (this.state.groupDataSource.length === 0) {
            Axios.post("/course/getAllGroup").then(function (res) {
                var dataSource = [...this.state.groupDataSource]
                res.data.forEach(item => {
                    dataSource.push({
                        key: item.gId,
                        no: item.gId,
                        group: item.gName
                    })
                });
                this.setState({ groupDataSource: dataSource })
            }.bind(this))
        }
        var pagination = {
            current: 1,
            pageSize: 10,
        }
        return (
            <Row>
                <Col type="flex" justify="center" align="right" span={23}>
                    <Button type="primary" onClick={this.onNewClick.bind(this)}>New</Button>
                </Col>
                <Col type="flex" justify="center" align="middle" span={24}>
                    <Table dataSource={this.state.groupDataSource} expandedRowRender={this.expandedRowRender.bind(this)} pagination={pagination}>
                        <Column title="No" dataIndex="no" key="no" />
                        <Column title="Group" dataIndex="group" key="group" />
                        <Column title="Action" dataIndex="action" key="action" render={
                            function (_, record) {
                                return (
                                    <>
                                        <Space size="middle">
                                            <Button type="primary" onClick={this.onAddClick.bind(this, record)}>Add</Button>
                                            <Button type="primary" onClick={this.onDeleteGroupClick.bind(this, record)}>Delete</Button>
                                        </Space>

                                    </>
                                )
                            }.bind(this)
                        } />
                    </Table>
                    <Modal title="New" visible={this.state.newVisible} onOk={this.onNewOk.bind(this)} onCancel={this.onNewCancle.bind(this)}>
                        <Input.Group compact>
                            <Input disabled style={{ width: '30%' }} defaultValue='Group' />
                            <Input style={{ width: '70%' }}
                                onChange={this.onNewChange.bind(this)}
                            />
                        </Input.Group>
                    </Modal>
                    <Modal title="Add" visible={this.state.addVisible} onOk={this.onAddOk.bind(this)} onCancel={this.onAddCancle.bind(this)}>
                        <Input.Group compact>
                            <Input disabled style={{ width: '30%' }} defaultValue='Class' />
                            <Input style={{ width: '70%' }}
                                onChange={this.onAddClassChange.bind(this)}
                            />
                            <Input disabled style={{ width: '30%' }} defaultValue='Teacher' />
                            <Input style={{ width: '70%' }}
                                onChange={this.onAddTeacherChange.bind(this)}
                            />
                            <Input disabled style={{ width: '30%' }} defaultValue="Date" />
                            <DatePicker.RangePicker style={{ width: '70%' }}
                                onChange={this.onAddDateChange.bind(this)}
                            />
                            <Input disabled style={{ width: '30%' }} defaultValue="Time" />
                            <TimePicker.RangePicker style={{ width: '70%' }}
                                onChange={this.onAddTimeChange.bind(this)}
                            />
                            <div>
                                <Checkbox indeterminate={this.state.indeterminate} checked={this.state.checkedAll}
                                    onChange={this.onAddCheckAllChange.bind(this)}
                                >
                                    Check all
                                                </Checkbox>
                                <br />
                                <Checkbox.Group
                                    options={this.options}
                                    value={this.state.checkedList}
                                    onChange={this.onAddCheckChange.bind(this)}
                                />
                            </div>
                        </Input.Group>
                    </Modal>
                </Col>
            </Row>
        )
    }
}
