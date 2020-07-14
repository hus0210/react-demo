import React from 'react';
import { Calendar, Modal } from 'antd';

export default class Home extends React.Component {
    state = { visible: false, data: 123};

    onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    onSelect(date) {
        this.setState({visible: true});
        console.log(date)
    }

    handleOk(e) {
        console.log(e);
        this.setState({visible: false});
    };

    handleCancel(e) {
        console.log(e);
        this.setState({visible: false});
    };

    render() {
        return (
            <div>
                <Calendar fullscreen={false} onPanelChange={this.onPanelChange.bind(this)} onSelect={this.onSelect.bind(this)} />
                <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}
