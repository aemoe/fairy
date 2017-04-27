"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import Nav from '../view/nav.js';
import RegForm from '../view/components/reg_form';

import logo_en from '../dist/img/text_logo.png';
import logo_cn from '../dist/img/text_logo_cn.png';

import '../dist/css/reset.css';
import Style from '../dist/css/style.css';
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
        <RegForm/>
        <div className={Login.form_reg}>
          点击 注册 按钮表示同意
          <a href="#">
            《用户注册规则》
          </a>
        </div>
      </div>
    );
  }
};

export default App;
