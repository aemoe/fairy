'use strict';
import React,{Component} from 'react';
import PropTypes from 'prop-types';

import Nav from '../view/nav.js';
import LoginForm from '../view/components/login_form';

import logo_en from '../dist/img/text_logo.png';
import logo_cn from '../dist/img/text_logo_cn.png';

import '../dist/css/reset.css';
import Login from '../dist/css/login.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav/>
        <div className={Login.banner}>
          <p className={Login.text_logo}>
            <img width="233" src={logo_en}/>
          </p>
          <p className={Login.text_logo_cn}>
            <img width="58" src={logo_cn}/>
          </p>
        </div>
        <LoginForm history={this.props.history}/>
        <div className={Login.form_reg}>
          还没有账号?
          <a href="#">立即注册 ListenLite</a>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
