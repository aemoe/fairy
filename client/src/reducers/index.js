"use strict";
import {combineReducers} from 'redux';
// Reducers
import homeReducer from './home_reducer.js';
// Combine Reducers
var reducers = combineReducers({homeState: homeReducer});

export default reducers;
