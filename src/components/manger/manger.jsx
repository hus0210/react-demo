import React from 'react';
import './manger.css'
import { Row, Col, Button, Table, Space, Input, Modal, DatePicker } from 'antd';

const { Column } = Table;

export default class Manger extends React.Component {
    state = {
        groupDataSource: [
            {
                key: 0,
                course: "CoursName",
                type: "Group",
            },
        ],
        classDataSource: [
            {
                key: 0,
                class: "ClassName",
                teacher: "Teacher",
                type: "Class",
            },
        ],
        groupInput: "",
        newVisible: false,
        addVisible: false,
    }

    expandedRowRender(record) {
        var classDataSource = this.state.classDataSource
        return (
            <Table dataSource={classDataSource} pagination={false}>
                <Column title="Class" dataIndex="class" key="class" />
                <Column title="Teacher" dataIndex="teacher" key="teacher" />
                <Column title="Data" dataIndex="data" key="data" />
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

    // New
    onNewClick() {
        this.setState({ newVisible: true })
    }

    onNewOk() {
        const { InputValue } = this.state;
        var dataSource = [...this.state.groupDataSource]
        dataSource.push(
            {
                key: InputValue,
                course: InputValue,
                type: "Group",
            },
        )
        this.setState({ newVisible: false, groupDataSource: dataSource })
    }

    onNewCancle() {
        this.setState({ newVisible: false })
    }

    // Add

    onAddClick(record) {
        this.setState({ addVisible: true })
    }

    onAddOk() {
        const { InputValueClass, InputValueTeacher, InputValueData } = this.state;
        var classDataSource = [...this.state.classDataSource]
        classDataSource.push({
            key: 1,
            class: InputValueClass,
            teacher: InputValueTeacher,
            data: InputValueData,
        })
        console.log(classDataSource)
        this.setState({ addVisible: false, classDataSource: classDataSource })
    }

    onAddCancle() {
        this.setState({ addVisible: false })
    }

    // Delete
    onDeleteGroupClick(record) {
        var dataSource = [...this.state.groupDataSource]
        dataSource.pop(record)
        this.setState({ groupDataSource: dataSource })
    }

    onDeleteClassClick(record) {
        var classDataSource = [...this.state.classDataSource]
        classDataSource.pop(record)
        console.log(classDataSource)
        this.setState({ classDataSource: classDataSource })
    }

    //Gen
    onGenClick(record) {
        console.log(record)
    }


    // modal
    handleGetInputValue(event) {
        this.setState({
            InputValue: event.target.value,
        })
    };

    handleGetInputValueClass(event) {
        this.setState({
            InputValueClass: event.target.value,
        })
    };

    handleGetInputValueTeacher(event) {
        this.setState({
            InputValueTeacher: event.target.value,
        })
    };

    handleGetInputValueData(value, dataString) {
        this.setState({
            InputValueData: dataString,
        })
    };

    render() {
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
                        <Column title="Course" dataIndex="course" key="course" />
                        <Column title="Action" dataIndex="action" key="action" render={
                            function (_, record) {
                                return (
                                    <Space size="middle">
                                        <Button type="primary" onClick={this.onAddClick.bind(this, record)}>Add</Button>
                                        <Button type="primary" onClick={this.onDeleteGroupClick.bind(this, record)}>Delete</Button>
                                    </Space>
                                )
                            }.bind(this)
                        } />
                    </Table>
                    <Modal title="New" visible={this.state.newVisible} onOk={this.onNewOk.bind(this)} onCancel={this.onNewCancle.bind(this)}>
                        <Input.Group compact>
                            <Input disabled style={{ width: '30%' }} defaultValue='classgroup' />
                            <Input style={{ width: '70%' }}
                                value={this.state.InputValue}
                                onChange={this.handleGetInputValue.bind(this)}
                            />
                        </Input.Group>
                    </Modal>
                    <Modal title="Add" visible={this.state.addVisible} onOk={this.onAddOk.bind(this)} onCancel={this.onAddCancle.bind(this)}>
                        <Input.Group compact>
                            <Input disabled style={{ width: '30%' }} defaultValue='class' />
                            <Input value={this.state.InputValueClass}
                                onChange={this.handleGetInputValueClass.bind(this)}
                                style={{ width: '70%' }}
                            />
                            <Input disabled style={{ width: '30%' }} defaultValue='teacher' />
                            <Input value={this.state.InputValueTeacher}
                                onChange={this.handleGetInputValueTeacher.bind(this)}
                                style={{ width: '70%' }}
                            />
                            <Input disabled style={{ width: '30%' }} defaultValue="data" />
                            <DatePicker.RangePicker
                                onChange={this.handleGetInputValueData.bind(this)}
                                style={{ width: '70%' }}
                            />
                        </Input.Group>
                    </Modal>
                </Col>
            </Row>
        )
    }
}
