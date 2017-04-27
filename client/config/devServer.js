//加载Node的Path模块
const path = require('path');
//加载webpack模块
const webpack = require('webpack');
// const express = require('express');
const WebpackDevServer = require('webpack-dev-server');
//加载webpack配置文件
const config = require('./webpack.config.dev');

//配置及初始化Koa服务器
var creatServer = () => {
    //初始化webpack应用
    let compiler = webpack(config);
    //调用webpack热加载模块及对应参数
    let app = new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true // 用颜色标识
        }
    });
    //调用开启5000端口用来测试和开发
    app.listen(5000, function(err) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:5000');
    });
};

//调用创建koa服务器方法
creatServer();
