import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Router from 'pages/route.jsx'

Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

ReactDOM.render(
    <Router />, document.getElementById('root')
);
