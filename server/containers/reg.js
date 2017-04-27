"use strict";
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import {Provider} from 'react-redux';
import bcrypt from 'bcrypt';

import routes from '../../client/src/route/router.js';
import configureStore from '../../client/src/store/store.js';
import db from '../config/db.js';
const User = db.User;

//get page and switch json and html
export async function index(ctx, next) {
  switch (ctx.accepts("json", "html")) {
    case "html":
      {
        match({
          routes,
          location: ctx.url
        }, (error, redirectLocation, renderProps) => {
          if (error) {
            console.log(500)
          } else if (redirectLocation) {
            console.log(302)
          } else if (renderProps) {
            //iinit store
            let loginStore = {user:{logined:ctx.isAuthenticated()}};
            const store = configureStore(loginStore);
            ctx.body = layout(renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps}/>
              </Provider>
            ), store.getState());
          } else {
            console.log(404);
          }
        })
      }
      break;
    case "json":
      {
        let callBackData = {
          'status': 200,
          'message': '这个是主页',
          'data': {}
        };
        ctx.body = callBackData;
      }
      break;
    default:
      {
        // allow json and html only
        ctx.throw(406, "allow json and html only");
        return;
      }
  }

};

//reg user
export async function reg(ctx, next) {
  if (ctx.accepts("json", "html") == "json") {
    let data = ctx.request.body;
    //If reg data is null,reback some tips
    if (!data.username || !data.password || !data.email) {
      let callBackData = {
        'success': false,
        'status': 200,
        'message': '请输入您的账号,密码及邮箱!',
        'data': {}
      };
      ctx.body = callBackData;
    } else {
      let userCount = await User.count({
        where: {
          username: data.username
        }
      });
      if (userCount) {
        let callBackData = {
          'success': false,
          'status': 200,
          'message': '用户名有重复!',
          'data': {}
        };
        ctx.body = callBackData;
      } else {
        let emailCount = await User.count({
          where: {
            email: data.email
          }
        });
        if (emailCount) {
          let callBackData = {
            'success': false,
            'status': 200,
            'message': '邮箱有重复!',
            'data': {}
          };
          ctx.body = callBackData;
        } else {
          let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(data.password, salt),
            insertData = {
              username: data.username,
              password: hash,
              email: data.email
            };

          await User.create(insertData).then(function(user) {
            let callBackData = {
              'success': true,
              'status': 200,
              'message': '用户已创建',
              'data': {}
            };
            ctx.body = callBackData;
          }, function(err) {
            let callBackData = {
              'success': false,
              'status': 200,
              'message': '数据格式不合适,请检查用户名或邮箱',
              'data': {}
            };
            ctx.body = callBackData;
          });

        }
      }
    }

  }
};

//vaildate uesrname
export async function vaildate_user(ctx, next) {
  if (ctx.accepts("json", "html") == "json") {
    let data = ctx.request.body;
    //If reg data is null,reback some tips
    if (data.username) {
      let userCount = await User.count({
        where: {
          username: data.username
        }
      });
      if (userCount) {
        let callBackData = {
          'success': false,
          'status': 200,
          'message': '用户名有重复!',
          'data': {}
        };
        ctx.body = callBackData;
      } else {

        let callBackData = {
          'success': true,
          'status': 200,
          'message': '用户名合法',
          'data': {}
        };
        ctx.body = callBackData;
      }
    } else {
      let callBackData = {
        'success': false,
        'status': 200,
        'message': '用户名不能为空!',
        'data': {}
      };
      ctx.body = callBackData;
    }
  }
};

export async function vaildate_email(ctx, next) {
  if (ctx.accepts("json", "html") == "json") {
    let data = ctx.request.body;
    //If reg data is null,reback some tips
    if (data.email) {
      let emailCount = await User.count({
        where: {
          email: data.email
        }
      });
      if (emailCount) {
        let callBackData = {
          'success': false,
          'status': 200,
          'message': '邮箱有重复!',
          'data': {}
        };
        ctx.body = callBackData;
      } else {

        let callBackData = {
          'success': true,
          'status': 200,
          'message': '邮箱合法',
          'data': {}
        };
        ctx.body = callBackData;
      }
    } else {
      let callBackData = {
        'success': false,
        'status': 200,
        'message': '用户名不能为空!',
        'data': {}
      };
      ctx.body = callBackData;
    }
  }
};
