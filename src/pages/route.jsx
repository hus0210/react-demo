import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Login from './login/login.jsx'
import Index from './index/index.jsx'

export default class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/index" component={Index} />
                </Switch>
            </HashRouter>
        )
    }
}
