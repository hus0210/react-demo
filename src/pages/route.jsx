import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
<<<<<<< HEAD
import Login from 'pages/login/login.jsx'
import Home from 'pages/home/home.jsx'
import SignIn from 'pages/signin/signin.jsx'
import NofFound from 'pages/notFound/notFound.jsx'
=======
import Login from './login/login.jsx'
import Home from './home/home.jsx'
import NofFound from './notFound/notFound.jsx'
>>>>>>> update home page to admin


export default class Router extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="*" component={NofFound} />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}
