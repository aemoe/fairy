'use strict';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from '../view/home.js';
import Page404 from '../view/404.js';
import User from '../view/user.js';
import Login from '../view/login.js';
import Reg from '../view/reg.js';
import Logout from '../view/logout';

const Routers = (
  <Router >
    <div>
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/user" component={User}/>
      <Route path="/login" component={Login}/>
      <Route path="/reg" component={Reg}/>
      <Route path="/logout" component={Logout}/>
      <Route component={Page404}/>
    </Switch>
    </div>
  </Router>
);

export default Routers;
