'use strict';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import Nav from '../view/nav.js';
import logo_en_black from '../dist/img/text_logo_black.png';
import tempImg1 from '../dist/img/temp.jpg';
import tempImg2 from '../dist/img/temp1.jpg';

import '../dist/css/reset.css';
import Home from '../dist/css/home.css';


class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <div className={Home.banner}>
          <p className={Home.logo_en}><img width="233" src={logo_en_black}/></p>
        <p className={Home.banner_text}>一起创造有趣的音频</p>
          <p>
            <Link to="/reg">
              <button className={Home.upload_btn}>立 即 创 作</button>
            </Link>
          </p>
        </div>
        <div className={Home.content}>
          <h1>作品列表</h1>
        <h2>我们推荐了啊啊所大所多一些好的作品供您食用</h2>

          <ul className={Home.list}>
            <li>
              <img src={tempImg1}/>
              <p>测测你的忍耐力!</p>
            </li>
            <li>
              <img src={tempImg2}/>
              <p>测测你的忍耐力!</p>
            </li>
            <li>
              <img src={tempImg1}/>
              <p>测测你的忍耐力!</p>
            </li>
            <li>
              <img src={tempImg2}/>
              <p>测测你的忍耐力!</p>
            </li>
            <li>
              <img src={tempImg1}/>
              <p>测测你的忍耐力!</p>
            </li>
            <li>
              <img src={tempImg2}/>
              <p>测测你的忍耐力!</p>
            </li>
          </ul>
          <div className={Home.readmore}>
            <span>您不满意？</span>
            <a>换一批!</a>
          </div>
        </div>
        <div className={Home.footer}>
          ©2013-2017 TeamMoe@LittleMusic TeamMoe@ListenLite 2017
        </div>
      </div>
    );
  }
}

export default App;
