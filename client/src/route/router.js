"use strict";
import React from 'react';
import {
    Router,
    Route,
    Link,
    browserHistory,
    IndexRoute,
    createMemoryHistory
} from 'react-router';
import Home from '../view/home.js';
import Page404 from '../view/404.js';
import User from '../view/user.js';
import Login from '../view/login.js';
import Reg from '../view/reg.js';
import Logout from '../view/logout';

const Routers = (
    <Router history={browserHistory}>

        <Route path="/" component={Home}/>
        <Route path="/user" component={User}/>
        <Route path="/login" component={Login}/>
        <Route path="/reg" component={Reg}/>
      <Route path="/logout" component={Logout}/>
        <Route path="*" component={Page404}/>
    </Router>
);

export default Routers;
