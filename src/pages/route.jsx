import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './login/login.jsx'
import Index from './index/index.jsx'
import SignIn from './signin/signin.jsx'

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/index" component={Index} />
                    <Route exact path="/signin/:class" component={SignIn} />
                </Switch>
            </BrowserRouter>
        )
    }
}
