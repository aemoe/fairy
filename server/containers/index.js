"use strict";
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import {layout} from '../view/layout.js';
import {Provider} from 'react-redux';
import configureStore from '../../client/src/store/store.js';
import App from '../../client/src/view/home.js';

//get page and switch json and html
export async function index(ctx, next) {
  console.log(ctx.state.user, ctx.isAuthenticated());
  switch (ctx.accepts("json", "html")) {
    case "html":
      {
        //init store
        let loginStore = {
          user: {
            logined: ctx.isAuthenticated()
          }
        };
        const store = configureStore(loginStore);
        const html = layout(renderToString(
          <Provider store={store}>
            <StaticRouter location={ctx.url} context={{}}>
              <App/>
            </StaticRouter>
          </Provider>
        ), store.getState());
        ctx.body = html;
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
