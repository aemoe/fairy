"use strict";
import {combineReducers} from 'redux';
//load redux-form plugin
import {reducer as formReducer} from 'redux-form';

import userReducer from './user_reducer';

// Combine Reducers
var reducers = combineReducers({form: formReducer,user:userReducer});

export default reducers;
