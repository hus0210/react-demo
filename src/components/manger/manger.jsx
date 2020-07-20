import React from 'react';
import './manger.css'
import { Row, Col, Button, Popover, Table, Space, Input, Modal, DatePicker, TimePicker, Checkbox, message, Transfer } from 'antd';
import QRCode from 'qrcode.react';
import Axios from 'axios';

const { Column } = Table;

export default class Manger extends React.Component {
    state = {
        groupDataSource: [],
        classDataSource: [],
        userDataSource: [],
        targetKeys: [],
        selectedKeys: [],
        newVisible: false,
        addVisible: false,
        indeterminate: true,
        checkedAll: false,
        checkedList: ["Mon", "Tue", "Wed", "Thu", "Fri"]
    }
    options = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    firstLoad = true
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

    onNewOk() {
        Axios.post("/course/insertGroup", {
            gName: this.userInput.group
        }).then(function (res) {
            var dataSource = [...this.state.groupDataSource]
            dataSource.push(
                {
                    key: res.data.gId,
                    id: res.data.gId,
                    group: res.data.gName,
                },
            )
            this.setState({ newVisible: false, groupDataSource: dataSource })
            message.success("Create group success")
        }.bind(this))
    }

    onNewCancle() {
        this.setState({ newVisible: false })
    }

    onDeleteGroupClick(record) {
        Axios.post('/course/deleteCourseById', {
            cGroup: record.id
        }).then(function (res) {
            if (res.data.message === "删除成功") {
                var dataSource = [...this.state.groupDataSource]
                dataSource.splice(dataSource.indexOf(record), 1)
                this.setState({ groupDataSource: dataSource })
                message.success("Delete class success")
            } else {
                message.error("Delete class fail")
            }
        }.bind(this))
    }

    // class
    onAddClick(record) {
        this.userInput.record = record
        Axios.post("/course/getAllEmployee").then(function (res) {
            var dataSource = []
            res.data.forEach(item => {
                dataSource.push({
                    key: item.eId,
                    id: item.eId,
                    name: item.eName
                })
            });
            this.setState({ userDataSource: dataSource })
        }.bind(this))
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

    onAddTransferChange(nextTargetKeys) {
        this.setState({ targetKeys: nextTargetKeys })
    }

    onAddTransferSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

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
                    cGroup: this.userInput.record.id,
                    cName: this.userInput.record.group,
                    cClass: this.userInput.class,
                    cStart: start.toLocaleDateString().replace(/\//g, '-') + " " + this.userInput.time[0],
                    cEnd: start.toLocaleDateString().replace(/\//g, '-') + " " + this.userInput.time[1],
                    cTeacher: this.userInput.teacher,
                })
            }
        }
        // send ajax request
        Axios.post("/course/insertAllCourses", paramList).then(function (res) {
            var dataSource = [...this.state.classDataSource]
            // add to classDataSource
            res.data.forEach(item => {
                dataSource.push({
                    groupId: item.cGroup,
                    key: item.cId,
                    id: item.cId,
                    class: item.cClass,
                    teacher: item.cTeacher,
                    start: item.cStart,
                    end: item.cEnd
                })
            });
            // set state
            this.setState({ classDataSource: dataSource })
            // add user
            var paramList = []
            this.state.targetKeys.forEach(item => {
                paramList.push(this.state.userDataSource[item - 1].id)
            });
            Axios.post("/course/insertSign", {
                cGroup: this.userInput.record.id,
                eIds: paramList
            }).then(function (res) {
                if (res.data.message === "添加成功") {
                    message.success("添加成功")
                } else {
                    message.fail("添加失败")
                }
            })
        }.bind(this))
        this.setState({ addVisible: false })
    }

    onAddCancle() {
        this.setState({ addVisible: false })
    }

    onDeleteClassClick(record) {
        Axios.post('/course/deleteCourseByCId', {
            cId: record.id
        }).then(function (res) {
            console.log(res)
            if (res.data.message === "删除成功") {
                var dataSource = [...this.state.classDataSource]
                dataSource.splice(dataSource.indexOf(record), 1)
                this.setState({ classDataSource: dataSource })
                message.success("Delete class success")
            } else {
                message.error("Delete class fail")
            }
        }.bind(this))
    }

    onGenClick(record) {
        console.log(record)
    }

    // children table
    expandedRowRender(record) {
        var dataSource = []
        this.state.classDataSource.forEach(item => {
            if (item.groupId === record.id) {
                dataSource.push(item)
            }
        });
        return (
            <Table dataSource={dataSource} pagination={false}>
                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Class" dataIndex="class" key="class" />
                <Column title="Teacher" dataIndex="teacher" key="teacher" />
                <Column title="Start" dataIndex="start" key="start" />
                <Column title="End" dataIndex="end" key="end" />
                <Column title="Action" dataIndex="action" key="action" render={
                    function (_, record) {
                        return (
                            <Space size="middle">
                                <Button type="primary" onClick={this.onDeleteClassClick.bind(this, record)}>Delete</Button>
                                <Popover content={
                                    <QRCode
                                        value={process.env.REACT_APP_SIGNIN_URL + '/' + toString(record.id)}
                                        size={300}
                                        fgColor="#000000" />
                                }>
                                    <Button type="primary" onClick={this.onGenClick.bind(this, record)}>Gen</Button>
                                </Popover>
                            </Space>
                        )
                    }.bind(this)
                } />
            </Table>
        )
    }

    onExpand(expanded, record) {
        if (expanded) {
            Axios.post('course/getCourseByGroup', {
                cGroup: record.id,
            }).then(function (res) {
                var dataSource = []
                res.data.forEach(item => {
                    dataSource.push({
                        groupId: record.id,
                        key: item.cId,
                        id: item.cId,
                        class: item.cClass,
                        teacher: item.cTeacher,
                        start: item.cStart,
                        end: item.cEnd
                    })
                });
                this.setState({ classDataSource: dataSource })
            }.bind(this))
        }
    }

    render() {
        if (this.firstLoad) {
            this.firstLoad = false
            Axios.post("/course/getAllGroup").then(function (res) {
                var dataSource = [...this.state.groupDataSource]
                res.data.forEach(item => {
                    dataSource.push({
                        key: item.gId,
                        id: item.gId,
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
                    <Modal title="New" visible={this.state.newVisible} onOk={this.onNewOk.bind(this)} onCancel={this.onNewCancle.bind(this)}>
                        <Input.Group compact>
                            <Input disabled style={{ width: '30%' }} defaultValue='Group' />
                            <Input style={{ width: '70%' }}
                                onChange={this.onNewChange.bind(this)}
                            />
                        </Input.Group>
                    </Modal>
                </Col>
                <Col type="flex" justify="center" align="middle" span={24}>
                    <Table dataSource={this.state.groupDataSource} pagination={pagination}
                        expandedRowRender={this.expandedRowRender.bind(this)}
                        onExpand={this.onExpand.bind(this)}
                    >
                        <Column title="Id" dataIndex="id" key="id" />
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
                            <div>
                                <Transfer dataSource={this.state.userDataSource} style={{ width: '100%' }}
                                    onChange={this.onAddTransferChange.bind(this)}
                                    targetKeys={this.state.targetKeys}
                                    selectedKeys={this.state.selectedKeys}
                                    onSelectChange={this.onAddTransferSelectChange.bind(this)}
                                    titles={['From', 'To']}
                                    render={item => item.name}
                                    oneWay
                                />
                            </div>
                        </Input.Group>
                    </Modal>
                </Col>
            </Row>
        )
    }
}
