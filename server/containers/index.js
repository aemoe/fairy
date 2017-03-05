"use strict";
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import {Provider} from 'react-redux';
import routes from '../../client/src/route/router.js';
import configureStore from '../../client/src/store/store.js';

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
                        const store = configureStore();
                        console.log(renderToString(
                            <Provider store={store}>
                                <RouterContext {...renderProps}/>
                            </Provider>
                        ));
                        this.body = layout(renderToString(
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
