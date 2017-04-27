"use strict";

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import {Provider} from 'react-redux';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import routes from '../../client/src/route/router.js';
import configureStore from '../../client/src/store/store.js';
import db from '../config/db.js';
import common from '../../common.json';
const User = db.User;

//get page and switch json and html
export async function index(ctx, next) {
  console.log(ctx.state.user, ctx.isAuthenticated());
  if (ctx.isAuthenticated()) {
    ctx.redirect('/');
  }
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
            let loginStore = {
              user: {
                logined: ctx.isAuthenticated()
              }
            };
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
          'message': '这个是登录页',
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

//user login
export async function login(ctx, next) {
  if (ctx.accepts("json", "html") == "json") {
    let data = ctx.request.body;
    //If reg data is null,reback some tips
    if (!data.username || !data.password) {
      let callBackData = {
        'success': false,
        'status': 200,
        'message': '请输入您的账号或邮箱和密码!',
        'data': {}
      };
      ctx.body = callBackData;
    } else {
      await User.findOne({
        attributes: [
          "id", "username", "password"
        ],
        where: {
          $or: [
            {
              username: data.username
            }, {
              email: data.username
            }
          ]
        }
      }).then(async(user) => {
        if (user) {
          let isMatch = bcrypt.compareSync(data.password, user.password);
          if (isMatch) {
            let token = jwt.sign({
              name: user.username
            }, common.token.key, {expiresIn: 10080});

            await user.updateAttributes({token: token}).then(async(user) => {
              await passport.authenticate('local', function(err, user, info, status) {
                if (user === false) {
                  let callBackData = {
                    'success': false,
                    'status': 200,
                    'message': '权限验证失败!',
                    'data': {}
                  };
                  ctx.body = callBackData;
                } else {
                  let callBackData = {
                    'success': true,
                    'status': 200,
                    'message': '登录成功!',
                    'data': {}
                  };
                  ctx.body = callBackData;
                  return ctx.login(user);
                }
              })(ctx, next);
            }, function(err) {
              let callBackData = {
                'success': false,
                'status': 200,
                'message': '保存权限失败!',
                'data': {}
              };
              ctx.body = callBackData;
            });

          } else {
            let callBackData = {
              'success': false,
              'status': 200,
              'message': '请输入您的账号或邮箱和密码错误!',
              'data': {}
            };
            ctx.body = callBackData;
          }
        } else {
          let callBackData = {
            'success': false,
            'status': 200,
            'message': '用户名或邮箱不存在!',
            'data': {}
          };
          ctx.body = callBackData;
        }

      }, function(err) {
        let callBackData = {
          'success': false,
          'status': 200,
          'message': '登录失败!',
          'data': {}
        };
        ctx.body = callBackData;
      });

    }

  }
}

//user logout
export function logout(ctx, next) {
  ctx.logout();
  switch (ctx.accepts("json", "html")) {
    case "html":
      {
        let callBackData = {
          'success': true,
          'status': 200,
          'message': '登出成功!',
          'data': {}
        }
        ctx.body = callBackData;
        ctx.redirect('/');
      }
      break;
    case "json":
      {
        let callBackData = {
          'success': true,
          'status': 200,
          'message': '登出成功!',
          'data': {}
        }
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

}
