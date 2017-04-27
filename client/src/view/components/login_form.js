"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
// import Mock from 'mockjs';

import Login from '../../dist/css/login.css';

// Mock.mock('/login', {
//   'success': true,
//   'status': 200,
//   'message': '登录失败!',
//   'data': {}
// });

const submit = async function submit(values) {
  let _this = this;
  await axios.post('/login', values).then(function(response) {
    console.log(response);
    if (!response.data.success) {
      throw new SubmissionError({_error: response.data.message});
    } else {
      _this.props.dispatch({type: 'LOGIN'});
      browserHistory.push('/');
    }
  })
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {error, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(submit.bind(this))}>
        <div className={error
          ? Login.tips_show
          : Login.tips}>
          {error}
        </div>
        <ul className={Login.form}>
          <li>
            <i className={Login.segmentation}></i>
          </li>
          <li>
            <b>登录到 ListenLite</b>
          </li>
          <li className={Login.form_border}>
            <Field component="input" name="username" placeholder="用户名 / 邮箱" type="text"/>
          </li>
          <li className={Login.form_pw}>
            <Field component="input" name="password" placeholder="密码" type="password"/>
          </li>
          <li>
            <Field className={Login.remmber_input} component="input" name="remmberPw" id="remmberPw"  type="checkbox"/>
            <label htmlFor="remmberPw" className={Login.remmber_pw}>记住密码</label>
          </li>
          <li>
            <button className={Login.form_submit} disabled={pristine || submitting} type="submit">登录</button>
          </li>
        </ul>
      </form>
    );
  }
};

export default connect()(reduxForm({form: 'login_form'})(LoginForm));
