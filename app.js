'use strict'
require('babel-polyfill');
// Node babel source map support
require("source-map-support").install()
// Javascript require hook
require('babel-core/register', {
    // Optional ignore regex - if any filenames **do** match this regex then they
    // aren't compiled.
    ignore: /(.css|.less)$/
});

//加载koa服务器模块
const path = require('path'),
    //加载koa主模块
    koa = require('koa'),
    //加载koa路由模块
    router = require('koa-router')(),
    //加载koa日记模块
    logger = require('koa-logger'),
    serve = require('koa-static2'),
    routers = require('./server/route/router.js');

//初始化koa对象
const App = () => {
    //创建koa服务器应用
    let app = new koa();
    //使用logger日志库
    app.use(logger());
    //use static dir
    app.use(serve("dist", __dirname + "/public"));
    //路由
    app.use(routers);
    return app;
};

//Creat koa server and listen at 8000
var creatServer = () => {
    const app = App();
    app.listen(8000, function(err) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:8000');
    });
};

//调用创建koa服务器方法
creatServer();
