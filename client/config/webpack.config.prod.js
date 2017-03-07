/**
  加载常用模块及Webpack需要的模块组件
**/
//加载Node的Path模块
const path = require('path'),
    //加载Node的fs模块
    fs = require('fs'),
    //加载webpack模块
    webpack = require('webpack'),
    //加载自动化css独立加载插件
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    //加载自动化HTML自动化编译插件
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    postcsseasysprites = require('postcss-easysprites'),
    //加载JS模块压缩编译插件
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    //加载公用组件插件
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

/**
  设置默认常用路径
**/
//srcDir为当前开发目录(默认:/src)
const srcDir = path.resolve(process.cwd(), 'src');
//assetsDir为当前建立目录(默认:/assets)
const assetsDir = path.resolve(process.cwd(), '../public');
//读取入口的js文件目录(本目录只能对应页面的入口的JS,其他脚本需要写在/dist/plugins中)
const jsEntryDir = path.resolve(srcDir, 'dist/js');
//生成JS的目录地址(默认:)
const jsDir = 'dist/js/';
//生成css的目录地址(默认:)
const cssDir = 'dist/css/';

const config = {
    devtool: 'source-map',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: assetsDir,
        filename: jsDir + '[name].js',
        publicPath: '/'
    },
    module: {
        //加载器配置
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: "[name]_[local]_[hash:base64:3]",
                                importLoaders: 1,
                                sourceMap: true
                            }
                        }, {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                plugins: () => [
                                    precss(),
                                    autoprefixer({
                                        browsers: ['last 3 version', 'ie >= 10']
                                    }),
                                    postcsseasysprites({imagePath: '../img', spritePath: './assets/dist/img'})
                                ]
                            }
                        }
                    ]
                })
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }, {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'dist/img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/css/style.css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['index'],
            filename: 'index.html'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
