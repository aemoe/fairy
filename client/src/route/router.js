import React from 'react';
import {
    Router,
    Route,
    Link,
    browserHistory,
    IndexRoute,
    createMemoryHistory
} from 'react-router';
import Home from '../../../client/src/view/home.js';
import Page404 from '../../../client/src/view/404.js';
import User from '../../../client/src/view/user.js';

const Routers = (
    <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/404" component={Page404}/>
        <Route path="/user" component={User}/>
    </Router>
);

export default Routers;
