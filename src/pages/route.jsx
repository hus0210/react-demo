import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from 'pages/login/login.jsx'
import Home from 'pages/home/home.jsx'
import SignIn from 'pages/signin/signin.jsx'
import NofFound from 'pages/notFound/notFound.jsx'


export default class Router extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/home/:eid" component={Home} />
                        <Route exact path="/signin/:class" component={SignIn} />
                        <Route exact path="*" component={NofFound} />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}
