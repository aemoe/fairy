/**
  加载常用模块及Webpack需要的模块组件
**/
//加载Node的Path模块
const path = require('path'),
  //加载Node的fs模块
  fs = require('fs'),
  //加载webpack模块
  webpack = require('webpack'),
  //加载自动化HTML自动化编译插件
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  //自动加浏览器兼容方案, 主要是css3的兼容方案
  autoprefixer = require('autoprefixer'),
  //可以让postCSS支持一些SASS的语法特性
  precss = require('precss'),
  //支持前端CSS精灵的功能 即背景图自动拼接和合成为一张图片, 减少请求
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
const assetsDir = path.resolve(process.cwd(), 'assets');
//读取入口的js文件目录(本目录只能对应页面的入口的JS,其他脚本需要写在/dist/plugins中)
const jsEntryDir = path.resolve(srcDir, 'dist/js');
//生成JS的目录地址(默认:)
const jsDir = 'dist/js/';
//生成css的目录地址(默认:)
const cssDir = 'dist/css/';

const config = {
  devtool: 'source-map',
  entry: {
    // index: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './src/index.js']
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:5000',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'axios'
    ]
  },
  output: {
    path: assetsDir, //path代表js文件输出的路径
    filename: jsDir + '[name].js', //用来配置输出文件名格式
    publicPath: '/' //公共路径, 用来配置所有资源前面增加的路径
  },
  module: {
    //加载器配置
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" //用来处理最基础的css样式
          }, {
            loader: "css-loader",
            options: {
              modules: true, //是否支持css-modules
              camelCase: true, //是否支持 -(中缸线)写法的class,id名称
              localIdentName: "[name]_[local]_[hash:base64:3]", //css-modules的生成格式
              importLoaders: 1, // 是否支持css import方法
              sourceMap: true //是否生成css的sourceMap, 主要用来方便调试
            }
          }, {
            loader: "postcss-loader", //postCSS加载模块,可以使用postCSS的插件模块
            options: {
              sourceMap: true,
              plugins: () => [
                precss(), //支持Sass的一些特性
                autoprefixer({
                  browsers: ['last 3 version', 'ie >= 10']
                }), //CSS3 自动化兼容方案
                postcsseasysprites({imagePath: '../img', spritePath: './assets/dist/img'}) //支持css精灵功能
              ]
            }
          }
        ]
      }, {
        test: /\.css$/,
        exclude: [path.resolve(srcDir, cssDir)],
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
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
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      //页面模板的地址, 支持一些特殊的模板, 比如jade, ejs, handlebar等
      inject: true,
      //文件插入的位置, 可以选择在 body 还是 head 中
      hash: true,
      //是否给页面的资源文件后面增加hash,防止读取缓存
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      //精简优化功能 去掉换行之类的
      chunks: [
        'index', 'vendor', 'manifest'
      ],
      //文件中插入的 entry 名称，注意必须在 entry 中有对应的申明，或者是使用 CommonsChunkPlugin 提取出来的 chunk. 简单理解即页面需要读取的js文件模块
      filename: 'index.html'
      //最终生成的 html 文件名称，其中可以带上路径名
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor', 'manifest' //需要分包的对应的名字
      ],
      filename: jsDir + '[name].js' //配置输出结构,这里配置的是按路径和模块名进行生成
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = config;
