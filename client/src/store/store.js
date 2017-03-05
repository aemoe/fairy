"use strict";

import {createStore} from 'redux';
import reducers from '../reducers/index.js';

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState);
    return store;
}
