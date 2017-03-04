"use strict";
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import routes from '../../client/src/route/router.js';

//get page and switch json and html
export function * index(next) {
    switch (this.accepts("json", "html")) {
        case "html":
            {
                match({
                    routes,
                    location: this.url
                }, (error, redirectLocation, renderProps) => {
                    if (error) {
                        console.log(500)
                    } else if (redirectLocation) {
                        console.log(302)
                    } else if (renderProps) {
                        this.body = layout(renderToString(<RouterContext {...renderProps}/>), {});
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
                this.body = callBackData;
            }
            break;
        default:
            {
                // allow json and html only
                this.throw(406, "allow json and html only");
                return;
            }
    }

};
