import React from 'react';
import { Calendar } from 'antd';

export default class Home extends React.Component {
    onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    render() {
        return (
            <Calendar onPanelChange={this.onPanelChange} />
        );
    }
}
