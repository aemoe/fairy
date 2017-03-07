"use strict";
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import routes from '../../client/src/route/router.js';
import db from '../config/db.js';
import configureStore from '../../client/src/store/store.js';

const User = db.User;

//get page and switch json and html
let index = function * index(next) {
    switch (this.accepts("json", "html")) {
        case "html":
            {
                let user = yield User.find({
                    attributes: [
                        "uid", "username", "password"
                    ],
                    where: {
                        uid: 1
                    }
                });

                match({
                    routes,
                    location: this.url
                }, (error, redirectLocation, renderProps) => {
                    if (error) {
                        console.log(500)
                    } else if (redirectLocation) {
                        console.log(302)
                    } else if (renderProps) {
                        const store = configureStore({data: user});
                        console.log(store.getState());
                        this.body = layout(renderToString(<RouterContext {...renderProps}/>), {a: 1});
                    } else {
                        console.log(404);
                    }
                })
            }
            break;
        case "json":
            {
                let user = User.find({
                    attributes: [
                        "uid", "username", "password"
                    ],
                    where: {
                        uid: 1
                    }
                });
                this.body = user;
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
export {index};
