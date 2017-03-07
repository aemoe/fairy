"use strict";

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index.js';

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, applyMiddleware(thunk));
    return store;
}
