"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, match, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import routes from './route/router.js';
import configureStore from './store/store.js';

let store = configureStore(window.__REDUX_DATA__);
const renderIndex = () => {
    render((
        <Provider store={store}>
            {routes}
        </Provider>
    ), document.getElementById('root'))
};
renderIndex();
store.subscribe(renderIndex);
