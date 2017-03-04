"use strict";
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import routes from '../../client/src/route/router.js';
import db from '../config/db.js';

const User = db.User;
console.log(User);
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
                        let user = User.find({
                            attributes: [
                                "uid", "username", "password"
                            ],
                            where: {
                                uid: 1
                            }
                        });
                        this.body = layout(renderToString(<RouterContext {...renderProps}/>), user);
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
