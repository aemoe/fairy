'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../redux/actions/index';

import Nav from '../view/nav.js';

import '../dist/css/reset.css';
import Style_404 from '../dist/css/404.css';

class App extends Component {
  componentDidMount() {
    let _this = this;
    axios.get('/logout').then(function(response) {
      if (response.data.success) {
        _this.props.logout();
        _this.props.history.push('/');
      }
    }).catch(function(error) {
      _this.props.logout();
      _this.props.history.push('/');
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
}

export default connect(null, actions)(App);
