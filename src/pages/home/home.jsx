import React from 'react';
import './home.css'
import Statistics from 'components/statistics/statistics.jsx'
import Manger from 'components/manger/manger.jsx'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class Home extends React.Component {
    render() {
        return (
            <>
                <Tabs defaultActiveKey="1" size={"large"}>
                    <TabPane tab="课程管理" key="1">
                        <Manger />
                    </TabPane>
                    <TabPane tab="签到统计" key="2">
                        <Statistics />
                    </TabPane>
                </Tabs>
            </>
        );
    }
}
