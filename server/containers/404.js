"use strict";
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import routes from '../../client/src/route/router.js';

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
            ctx.body = layout(renderToString(<RouterContext {...renderProps}/>), {});
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
