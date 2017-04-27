"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, match, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './route/router.js';
import configureStore from './store/store.js';

let store = configureStore(window.__REDUX_DATA__);
const renderIndex = () => {
    render((
      <div>
        <Provider store={store}>
            {routes}
        </Provider>
      </div>
    ), document.getElementById('root'))
};
renderIndex();
store.subscribe(renderIndex);
store.subscribe(() =>
    console.log(store.getState())
);
