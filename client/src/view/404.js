'use strict';
import React,{Component} from 'react';

import Nav from '../view/nav.js';

import '../dist/css/reset.css';
import Style_404 from '../dist/css/404.css';

import title_404 from '../dist/img/404.png';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav/>
        <div className={Style_404.wrapper}>
          <p><img src={title_404}/></p>
          <p>NOT FOUND PAGE!</p>
          <p>找不到页面</p>
        </div>
      </div>
    );
  }
}
