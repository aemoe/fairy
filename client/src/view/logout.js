"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import axios from 'axios';

import Nav from '../view/nav.js';

import '../dist/css/reset.css';
import Style_404 from '../dist/css/404.css';

class App extends Component {
  componentDidMount() {
    let _this = this;
    axios.get('/logout').then(function(response) {
      if (response.data.success) {
        _this.props.dispatch({type: 'LOGOUT'});
        browserHistory.push('/');
      }
    }).catch(function(error) {
      _this.props.dispatch({type: 'LOGOUT'});
      browserHistory.push('/');
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        <Nav/>
        <div className={Style_404.wrapper}>
          <p>正在退出登录...</p>
        </div>
      </div>
    );
  }
};

export default connect()(App);
