'use strict';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import defaultAvatar from '../dist/img/avatar/user_1.png';

import '../dist/css/reset.css';
import Style from '../dist/css/style.css';

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      let logined = this.props.user.logined;
      return (
        <ul className={Style.nav}>
            <li className={Style.fl}>
                <Link to="/">首 页</Link>
            </li>
            <li className={Style.fl}>
                <Link to="/404">串 流</Link>
            </li>
            <li>
                <Link to="/">
                    <i className={Style.logo}></i>
                </Link>
            </li>
            <li className={logined?Style.avatar:Style.login_visable}>
              <img src={defaultAvatar} />
              <dl>
                <Link to="/"><dt>我的主页</dt></Link>
                <Link to="/"><dt>我要上传</dt></Link>
              <Link to="/logout"><dt>退出</dt></Link>
              </dl>
            </li>
            <li className={logined?Style.login_visable:Style.fr}>
                  <Link to="/reg">
                      <b>注 册</b>
                  </Link>
              </li>
              <li className={logined?Style.login_visable:Style.fr}>
                  <Link to="/login">登 录</Link>
              </li>
        </ul>
      );
    }
}

Nav.propTypes = {
  user: PropTypes.object
};

function user(state) {
  return {
    user: state.user
  };
}

export default connect(user)(Nav);
