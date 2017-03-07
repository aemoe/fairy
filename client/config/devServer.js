//加载Node的Path模块
const path = require('path');
//加载webpack模块
const webpack = require('webpack');
//加载webpack 热加载服务器模块
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
//加载webpack配置文件
const config = require('./webpack.config.dev');
//加载koa服务器模块
const koa = require('koa');

//配置及初始化Koa服务器
var creatServer = () => {
    //创建koa服务器应用
    let app = new koa();
    //初始化webpack应用
    let compiler = webpack(config);
    //调用webpack热加载模块及对应参数
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        hot: true,
        lazy: false,
        historyApiFallback: true,
        stats: {
            colors: true // 用颜色标识
        }
    }));
    app.use(webpackHotMiddleware(compiler), {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    });
    //调用koa列出开发目录
    app.use(require('koa-serve-index')(path.join(process.cwd(), '/src')));
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
