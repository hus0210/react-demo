import React from 'react';
import './home.css'
import { Row, Col, Typography, Button, Table, Space, Input, Modal, DatePicker, Tabs, TimePicker } from 'antd';

const { Title } = Typography;
const { Column } = Table;

const { TabPane } = Tabs;

export default class Home extends React.Component {
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
                data: "Data",
                time: "Time",
                type: "Class",
            },
        ],
        visible: false,
    }

    expandedRowRender(record) {
        var classDataSource = this.state.classDataSource
        return (
            <Table dataSource={classDataSource} pagination={false}>
                <Column title="Class" dataIndex="class" key="class" />
                <Column title="Teacher" dataIndex="teacher" key="teacher" />
                <Column title="Data" dataIndex="data" key="data" />
                <Column title="Time" dataIndex="time" key="time" />
                <Column title="Action" dataIndex="action" key="action" render={
                    function (_, record) {
                        return (
                            <Space size="middle">
                                <Button type="primary" onClick={this.onEditClick.bind(this, record)}>Edit</Button>
                                <Button type="primary" onClick={this.onDeleteClassClick.bind(this, record)}>Delete</Button>
                                <Button type="primary" onClick={this.onGenClick.bind(this, record)}>Gen</Button>
                            </Space>
                        )
                    }.bind(this)
                } />
            </Table>
        )
    }

    onNewClick() {
        this.setState({ visible: true })
    }

    onNewOk() {
        const { InputValue } = this.state;
        console.log(InputValue, '------InputValue');


        var dataSource = [...this.state.groupDataSource]
        dataSource.push(
            {
                key: InputValue,
                course: InputValue,
                type: "Group",
            },
        )
        console.log(dataSource)
        this.setState({ visible: false, groupDataSource: dataSource })
    }

    handleGetInputValue(event) {
        this.setState({
            InputValue: event.target.value,
        })
    };

    onNewCancle() {
        this.setState({ visible: false })
    }

    onDeleteGroupClick(record) {
        console.log(record)

        var dataSource = [...this.state.groupDataSource]
        dataSource.pop(record)
        console.log(dataSource)
        this.setState({ visible: false, groupDataSource: dataSource })
    }

    onAddClick(record) {
        console.log(record)
        this.setState({ visible2: true })
    }

    onAddOk() {
        const { InputValueClass, InputValueTeacher, InputValueData, InputValueTime } = this.state;

        var classDataSource = [...this.state.classDataSource]
        classDataSource.push({
            key: 1,
            class: InputValueClass,
            teacher: InputValueTeacher,
            data: InputValueData,
            time: InputValueTime,
        })
        console.log(classDataSource)
        this.setState({ visible2: false, classDataSource: classDataSource })

    }

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
        this.setState({ InputValueData: dataString })
    };

    handleGetInputValueTime(value, timeString) {
        // console.log(timeString)
        this.setState({ InputValueTime: timeString })
    };


    onAddCancle() {
        this.setState({ visible2: false })
    }

    onEditClick(record) {
        console.log(record)
    }

    onDeleteClassClick(record) {
        console.log(record)
        var classDataSource = [...this.state.classDataSource]
        classDataSource.pop(record)
        console.log(classDataSource)
        this.setState({ visible: false, classDataSource: classDataSource })
    }

    onGenClick(record) {
        console.log(record)
    }

    callback(key) {
        console.log(key);
    }

    render() {
        var pagination = {
            current: 1,
            pageSize: 10,
        }
        return (
            <>
                <Tabs defaultActiveKey="1" size={"large"} onChange={this.callback.bind(this)}>
                    <TabPane tab="课程管理" key="1">
                        <Row>
                            <Col span={24}>
                                <Title>FNST</Title>
                            </Col>
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
                                <Modal visible={this.state.visible} onOk={this.onNewOk.bind(this)} onCancel={this.onNewCancle.bind(this)}>
                                    <Row>
                                        <Col span={20}>
                                            <Input.Group compact>
                                                <Input style={{ width: '30%' }} defaultValue='classgroup' />
                                                <Input style={{ width: '70%' }} value={this.state.InputValue} onChange={this.handleGetInputValue.bind(this)} />
                                            </Input.Group>
                                        </Col>
                                    </Row>
                                </Modal>
                                <Modal visible={this.state.visible2} onOk={this.onAddOk.bind(this)} onCancel={this.onAddCancle.bind(this)}>
                                    <Row>
                                        <Col span={20}>
                                            <Input.Group compact>
                                                <Input style={{ width: '30%' }} defaultValue='class' disabled={true} /><Input value={this.state.InputValueClass} onChange={this.handleGetInputValueClass.bind(this)} style={{ width: '70%' }} />
                                                <Input style={{ width: '30%' }} defaultValue='teacher' disabled={true} /><Input value={this.state.InputValueTeacher} onChange={this.handleGetInputValueTeacher.bind(this)} style={{ width: '70%' }} />
                                                <Input style={{ width: '30%' }} defaultValue="data" disabled={true} /><DatePicker.RangePicker onChange={this.handleGetInputValueData.bind(this)} style={{ width: '70%' }} />
                                                <Input style={{ width: '30%' }} defaultValue="time" disabled={true} /><TimePicker.RangePicker onChange={this.handleGetInputValueTime.bind(this)} style={{ width: '70%' }} />
                                            </Input.Group>
                                        </Col>
                                    </Row>
                                </Modal>

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="签到统计" key="2">

                    </TabPane>
                </Tabs>
            </>
        );
    }
}
