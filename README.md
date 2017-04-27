
<div align="center">
  <a href="https://github.com/aemoe/fairy">
    <img width="100" heigth="100" src="doc/img/logo.png">
  </a>
  <h2>Fairy - 一个前后端分离框架 </h2>
  <p align="left">
  一个能够支持前后端分离并支持中间层同构的完整框架,或许现在它还不够完善,但是我会把构建该框架中遇到的问题都列出来,以方便其他人遇到问题不在需要去到处搜索问题,希望为自己搭建框架的人有一些帮助,文档也会不断更新和优化,你可以watch项目随时看到文档的更新,也希望最后成为一个完整而又完美的框架,如果这些问题对你有帮助,请点个star吧,感谢~ ~
  <p>
</div>

<h2 align="center">框架名字</h2>

###  为什么叫这个名字?

因为这是一份送给一只名叫Fairy Mo(美人)的猫的礼物 ~

<h2 align="center">计划执行</h2>

- [x] 路由同步 React-router及Koa-router同步
- [x] 模板同步 View层同步,使用react-dom/server实现
- [x] 数据同步 使用Redux及React-redux实现
- [x] css-modules同步 保证前后端生成的css-modules相同
- [x] webpack热加载组件优化


<h2 align="center">怎么安装</h2>

开启本地数据库Mysql,并使用phpmyadmin类似的工具在mysql中创建数据库(名字随意之后要填写),之后将mysql中的文件夹sql文件导入数据库, 最后在server/config/db.json中配置mysql的数据库名称和用户名密码即可

```bash
npm i
npm start
```


<h2 align="center">框架优势</h2>

* 路由同步(前后端共用一套路由)
* 模板同步(前后端共用一套模板)
* 数据同步(前后端公用一套数据状态机)

同构对比之前非同构加载对比, 可以明显看到白屏时间更少, 页面总计加载速度更快

非同构 VS 同构

![IMG](doc/img/vs.png)

<h2 align="center">也想从头到尾构建一个这样的框架? Well, 我把构建过程尽量详细的写下来</h2>

### 架构

对于一个框架, 最重要是架构, 我们如果需要构建一个前后端中间层同构的插件, 就需要在一个文件夹中. 考虑架构时,我为了让前后端所使用的环境相对独立, 前端部分可以单独提取出来进行制作, 也希望后端部分也能更清晰的展现和管理. 我们决定将框架内容分成两大部分, **Cliet** 和 **Server** 两个文件夹分别保存.对于前端文件夹目录结构相对比较固定了, 不需要考虑太多东西, 按照官方的推荐目录即可, 将View, Router和Store区分出来即可. 而服务器端部分, 我们考虑后还是使用最经典的MVC架构, 这样可以将控制层, 数据层和展示层区分出来, 即利于后台业务的解耦, 也利于我们之后的维护修改和添加新业务.

目录结构如下:

```
├── client 前端开发文件夹
│   ├── assets 前端自测试打包资源生成地址
│   │   └── dist 打包生成的资源文件, 包含js,img,css
│   │       └── js
│   │       └── css
│   │       └── img
│   ├── config webpack配置文件目录
│   └── src 开发目录
│       ├── actions redux的action文件存放目录
│       ├── data 测试数据存放文件
│       ├── dist 资源文件存放目录
│       │   ├── css
│       │   └── img
│       │   └── js
│       ├── reducers redux的reducers文件存放目录
│       ├── route 前端路由存放地址
│       ├── store 前端redux状态控制存放目录
│       └── view 前端视图存放目录
├── public 服务器所使用的前端打包文件夹
│   └── dist
│       ├── css
│       ├── img
│       └── js
└── server 后端开发目录夹
    ├── auth 权限验证目录 用来存放用户验证部分
    ├── config 后端例如数据库等配置文件的存放目录
    ├── containers 后端控制层 C 层的代码存放目录
    ├── models 后端数据库控制代码存放目录
    ├── route 后端路由存放目录
    └── view 后端页面生成外套层存放目录,由于界面同步, 后端只负责生成页面时的外套嵌套
```

### 前言

**为什么要用中间同构?中间同构是什么?**

在出现同构之前，我们会让后端输出API的json数据, 而前端接收到这些数据以后, 进行封装和拼装,这样会出现一个问题,就是如果业务变更了,那么接口变更,这时候前端和后端人员都需要重新修改字节的代码和业务逻辑,之前的主要问题如下：

* **1. 前后端需要进行各自的开发, 并以json接口对接**

```
后端用自己的业务实现业务逻辑和json数据的拼接,前端接收到json数据,完成数据到界面的转换,成本很大
```

* **2. SEO问题**

```
异步加载的SEO优化问题，没有服务端渲染，蜘蛛抓取不到数据，无SEO可言
```

其实理由很简单,就是为了减少开发成本,并增加整体项目的可维护性, 而且通过使用该技术可以有效减少网页加载速度,并提供优良的SEO优化能力,还能够利用Nodejs的高并发能力的特性,让Nodejs处理它最擅长的方面,从而增加整体架构的负载能力,节约硬件成本,提升项目的的负载能力

### 一. Nodejs的环境安装和配置

构建一个这样的框架 肯定用的是NodeJS环境, 毕竟无论是后端服务器, 代码打包优化等工作,都是由Nodejs负责制作的

怎么安装?很简单~ ~ 官方地址直接下载 [Nodejs官网](https://nodejs.org/en/)

Window: 直接下载官方安装包安装即可,请下载最新版本,这样可以支持新的一些特性,例如async和await等,之后会用到

Mac: 不建议用安装包安装 一个是升级不方便,切换版本也不方便,而且卸载非常麻烦,mac使用brew安装或者nvm来安装,攻略大家自己搜索吧

### 二.webpack及babel环境工具的搭建

当完成了Nodejs环境, 我们会遇到一个大坑, 就是需要一些自动化工具的使用, 主要是webpack和babel,webpack我们使用2.0版本,也是最近发布的

Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。

可以看到官方介绍,更多是将该工具定义为一个模块化管理和打包工具,也正是这样的,它在我们前端工作中负责的就是自动打包的功能,它能帮助我们自动合并打包js,删除重复的js代码,自动处理一些样式文件等工作,等于是一个自动化栈,完成各种之前需要手动操作的工作

Babel是一个转换编译器，它能将ES6转换成可以在浏览器中运行的代码。Babel由来自澳大利亚的开发者Sebastian McKenzie创建。他的目标是使Babel可以处理ES6的所有新语法，并为它内置了React JSX扩展及Flow类型注解支持。

在当下浏览器标准尚未统一,对ES6和ES7支持性未到时候 我们需要babel自动将我们所使用的ES6,7的新特性进行转换,并变成我们浏览器都兼容的ES5语法,并可以让你的代码更规范和整齐.

我当时使用这2个工具时候,webpack觉得配置很麻烦,还要一堆loader(加载器),各种配置,觉得非常麻烦,但是适应了以后就觉得非常简单了

**如何配置webpack2的配置和怎么让环境支持热加载**

这部分由于是客户端环境的工具配置, 不会讲解的特别细, 大家可以去官方中文网进行阅读和学习,但是会将一些遇到的坑,和如何配置,我们来看下webpack2的配置都是干什么的,当前环境的配置 [Webpack配置文件](https://github.com/aemoe/fairy/blob/master/client/config/ "Webpack配置文件")

为什么要2个配置文件?devServer.js是什么?

**开发环境配置文件(webpack.config.dev.js & devServer.js)**

嗯很简单, 一个配置文件(webpack.config.dev.js)是用来开发环境用的, 它支持一些热加载热替换功能, 不需要我们在刷洗页面就可以看到随时修改的变化, 并且会支持source map的支持,方便我们调试页面和脚本. 自然需要实现这些需要我们搭配一个服务器一起运行

我们看下代码片段:

```js
	//加载webpack模块
    webpack = require('webpack'),
    //加载自动化HTML自动化编译插件
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    postcsseasysprites = require('postcss-easysprites'),
    //加载公用组件插件
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
```

头部这些主要是一些需要使用到的插件组件, 注释也写得很清楚了, 引用了这些插件, 我们才能实现对应的功能 我一个一个解释下吧

```js
webpack = require('webpack'),
```

这个不说了

```js
HtmlWebpackPlugin = require('html-webpack-plugin'),
```
当引用这个组件时,我们就可以完成**自动将模板转化为HTML页面并将页面所使用的css经过webpack打包后的链接自动加载在页面源码中**,是不是很方便,我们看下配置

```js
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
            chunks: ['index','vendor','manifest'],
			//文件中插入的 entry 名称，注意必须在 entry 中有对应的申明，或者是使用 CommonsChunkPlugin 提取出来的 chunk. 简单理解即页面需要读取的js文件模块
            filename: 'index.html'
			//最终生成的 html 文件名称，其中可以带上路径名
}),
```


```js
 CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
```

当webpack打包时,如果不进行分包工作, 他会打包成一个js文件,名字就是入口你给的名字,比如:

```js
entry: {
        index:  './src/index.js'
		}
```

如果不使用该组件, 打包完成生成的就只有一个index,js文件,所以我们还是为了将一些公用的包提取出来, 就需要记性分支打包,这样做为什么? 还是为了利用浏览器缓存, 也可以在项目新部署时, 完成只对更新的包进行替换, 而公用那部分不进行替换, 这样用户就不需要再下载公用的js, 从减小服务器或者CDN压力, 对吧 省钱~ 服务器不要钱啊, CDN不收费啊?

怎么用咧? 我们不说直接上代码

**入口配置**
```js
entry: {
        index:
          './src/index.js',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'axios'
        ]
    }
```
我们可以看到vendor模块将所有用的一些公用模块写在了这里, 为了就是让这些公共模块方便之后的插件配置,让它们单独打包, index模块则是我们单页面应用时所用的脚本,都是我们自己写得脚本啦~

**模块配置js**
```js
new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendor', 'manifest'//需要分包的对应的名字
            ],
            filename: jsDir+'[name].js' //配置输出结构,这里配置的是按路径和模块名进行生成
        }),
```

这里为什么多了个manifest? 这个是个啥东西, 说简单点, 就是webpack2 用来存储一些关系啦, 链接啦之类的东西, 如果不提取这个模块, 每次打包之后vendor 都会有变化, 就失去了我们替换资源时不替换vendor包的意义了, 对吧~ ~ 所以每次项目更新下,只需要替换index.js和mainifest.js就可以了, 很黑科技吧~ 哈哈 go on go on

```js
    autoprefixer = require('autoprefixer'),
	//自动加浏览器兼容方案, 主要是css3的兼容方案
    precss = require('precss'),
	//可以让postCSS支持一些SASS的语法特性
    postcsseasysprites = require('postcss-easysprites'),
	//支持前端CSS精灵的功能 即背景图自动拼接和合成为一张图片, 减少请求
```

这几个插件其实都是postCss的插件, PostCSS和LESS, SASS都是CSS预加载器, 主要是为了让我们更加快捷和简单的编写CSS 并让CSS支持一些编程的特性, 例如循环, 变量等功能 这里我们构建选择了postCSS, 原因很简单, 1.非常快 2. 插件可以支持Sass和Less的功能

我们看看webpack是如何处理文件的, webpack采用的是**loader(加载器)**来处理, 用各种loader进行文件的细化处理和特性的执行,看下代码:

```js
module: {
        //加载器配置
        rules: [
            {
                test: /\.css$/,

                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            camelCase: true,
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
                        loader: "babel-loader",
                        options: {
                            presets: ['react-hmre']
                        }
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
```

非常长 我们拆分来看:

**CSS的处理**, 具体格式不说了, 直说都是干什么的, 为什么这么做

```js
{
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader" //用来处理最基础的css样式
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, //是否支持css-modules
                            camelCase: true,//是否支持 -(中缸线)写法的class,id名称
                            localIdentName: "[name]_[local]_[hash:base64:3]",//css-modules的生成格式
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
                                }),//CSS3 自动化兼容方案
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

            },
```

看完代码, 我们主要说下css-modules, 引用它的主要原因是为了让样式可以自动加上标识和hash, 这样就可以做到让样式永远不会冲突的功能了, 这样做的好处显而易见, 就是可以让团队一起开发时, 不在纠结样式名冲突的问题, 而且也可以通过使用css-modules减少样式的层叠, 减少父级的引用, 这样的低层级有利于样式的复用和利用, 让样式更加通用和增强复用性.

为什么这里写了2个css loader模块, 原因很简单, 因为为了防止其他插件,模块的样式被增加css-modules的变化, 所以需要加另一个loader让其他不在指定文件夹中的css样式不在受到css-modules的影响, 所以多加了一句 **exclude: [path.resolve(srcDir, cssDir)]**, 删掉了对应css-modules的配置部分, 详细的见上面的代码.

我们再看看**输出的配置**

```js
output: {
        path: assetsDir,//path代表js文件输出的路径
        filename: jsDir + '[name].js', //用来配置输出文件名格式
        publicPath: '/' //公共路径, 用来配置所有资源前面增加的路径,之后在生成目录会讲解该路径的具体用途
    },
```

最后我们看下**开发工具**, 通过使用该工具,可以自动加载source-map,方便我们的调试开发, 毕竟压缩过的代码是无法进行调试的, 而source-map可以还原之前代码并指向位置, 这样方便我们操作

```js
  devtool: 'source-map',
```

因为是开发环境, 所以我们需要一个重要的功能, 就是**react的热加载**, 什么是热加载呢? 就是我们在开发中可以不刷新页面就可以完成页面的变化, 包括样式,react脚本的变化, 还有对应redux的状态控制变化等, 这里我们使用的是**webpack-dev-server**和**react-hot-loader3**, 通过它们的使用, 就可以完成页面的热加载和替换功能. 我们看下配置方法:

建立一个devServer.js, 用来执行服务器的运行和具体配置, 并附加上react-hot-loader3插件, code如下:

```js
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
        publicPath: config.output.publicPath, //文件的输出路径,由于是都是在内存中执行的, 所以是看不到具体的文件的
        hot: true, //是否开启热加载功能
        historyApiFallback: true,//是否记录浏览器历史,配合react-router使用
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
```
配置文档含有注释, 不在详细介绍, 只说下**webpack-dev-server**的功能, 这个服务器等于一个微型的express或者koa框架, 使用它可以使用nodejs完成一个简单的本地服务器, 并支持热替换功能, 主要是检测webpack打包过程和让程序支持热加载, 但是应用了这个插件并不会完成所有热加载效果, 比如我们在使用redux时, 就会出问题, 因为这个热替换并不能保留state(状态), 所以使用时, 每次保存, react组件的状态就不会保留, 所以需要引入另一个插件**react-hot-loader**来解决这个问题, 我们看下如何使用这个插件, 插件的使用方法很多, 我选择了一个最简单的方法来实现,见code

第一步: 在入口文件哪里加上最上面3句话

```js
entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:5000',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
}
```

第二部: 增加webpack中的热更新插件

```js
new webpack.HotModuleReplacementPlugin(),
```

第三部: 在babel中增加对应的热加载模块

我们需要在根目录中增加一个文件.babelrc,用来配置babel的配置

我们只需要增加一个热加载插件

```json
{
    "plugins": [ "react-hot-loader/babel" ]
}
```

那么我们之后看下, Babel的配置

```json
{
    "presets": ["react", "es2015", "stage-0", "stage-1", "stage-2", "stage-3"],
    "plugins": ["transform-class-properties", "transform-es2015-modules-commonjs", "transform-runtime","react-hot-loader/babel"]
}
```

我们在Babel中使用了很多的转换器和插件, 安装也很简单,我们使用的包有以下这些,具体功能不在阐述了, 大家自己Search吧~

```json
"babel-cli": "^6.23.0",
"babel-core": "^6.6.5",
"babel-eslint": "^6.1.0",
"babel-loader": "^6.2.4",
"babel-plugin-transform-class-properties": "^6.11.5",
"babel-plugin-transform-es2015-modules-commonjs": "^6.23.0",
"babel-plugin-transform-react-jsx": "^6.23.0",
"babel-plugin-transform-require-ignore": "^0.0.2",
"babel-plugin-transform-runtime": "^6.23.0",
"babel-polyfill": "^6.23.0",
"babel-preset-es2015": "^6.3.13",
"babel-preset-react": "^6.3.13",
"babel-preset-react-hmre": "^1.1.1",
"babel-preset-stage-0": "^6.22.0",
"babel-preset-stage-1": "^6.22.0",
"babel-preset-stage-2": "^6.13.0",
"babel-preset-stage-3": "^6.22.0",
"babel-register": "^6.23.0",
"babel-runtime": "^6.23.0",
```

最后我们看下**打包生成的webpack配置文件**

```js
ExtractTextPlugin = require('extract-text-webpack-plugin'),
```

webpack在打包代码时,可以看到样式直接生成在页面的, 所以我们如果想让这些样式单独为一个文件引用时, 就需要用这个的插件, 当使用这个插件的时候, 就可以让页面以link模式引用css了, 在一些比较大的样式时 还是让css样式存储在浏览器cache里面比较能减轻服务器数据吞吐压力,配置如下:

```js
new ExtractTextPlugin('dist/css/style.css'),
```

这里我们将所有样式压缩为一个style.css文件,当然,也可以实现分开打包

```js
new ExtractTextPlugin(cssDir + '[name].css'),
```

```js
    //加载JS模块压缩编译插件
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
```
加载压缩模块, 可以将js压缩为最精简的代码, 大幅度减小生成的文件大小, 配置如下:
```js
new UglifyJsPlugin({
    // 最紧凑的输出
    beautify: false,
    // 删除所有的注释
    comments: false,
    compress: {
      // 在UglifyJs删除没有用到的代码时不输出警告  
      warnings: false,
      // 删除所有的 `console` 语句
      // 还可以兼容ie浏览器
      drop_console: true,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true,
    }
})
```

OK, 我们完成了webpack和Babel的配置, 就可以开始开发了, 这部分主要还是资料的稀缺,现在有了中文官方站好一些, 之前很多配置并不是很找, 看了后希望大家能够明白这些配置是干什么的而不只是按照别人的配置完成即可.

### 三.react的引用

react作为实现的核心框架,主要的黑科技也是靠它给出的一些方法来实现的,我们先看下react的生命周期

**ReactJS的生命周期**

![IMG](doc/img/react-lifecycle.png)

ReactJS的生命周期可以分为三个阶段来看：**实例化、存在期、销毁期**

**实例化**

首次实例化

* getDefaultProps
* getInitialState
* componentWillMount
* render
* componentDidMount

实例化之后更新，这一过程和上面一样，但没有getDefaultProps这个过程
简单记忆：props => state => mount => render => mounted

**存在期**

组件已经存在，状态发生改变时

* componetWillReceiveProps
* shouldComponentUpdate
* ComponentWillUpdate
* render
* componentDidUpdate

简单记忆：receiveProps => shouldUpdate => update => render => updated

**销毁期**

componentWillUnmount

生命周期中10个API的作用说明

* getDefaultProps
作用于组件类，只调用一次，返回对象用于设置默认的props，对于引用值，会在实例中共享

* getInitialState
作用于组件实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props

* componentWillMount
在完成首次渲染之前调用，此时可以修改组件的state

* render
必选方法，创建虚拟DOM，该方法具有特殊规则：
```
只能通过this.props 和this.state访问数据
可以返回null、false或任何React组件
只能出现一个顶级组件，数组不可以
不能改变组件的状态
不能修改DOM
```

* componentDidMount
真实的DOM被渲染出来后调用，可以在此方法中通过 this.getDOMNode()访问真实的DOM元素。此时可以使用其它类库操作DOM。服务端不会被调用

* componetWillReceiveProps
组件在接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件的props及state

* shouldComponentUpdate
组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法，通常不需要使用以避免出现bug。在出现应用性能瓶颈时，是一个可以优化的点。

* componetWillUpdate
接收新props或state后，进行渲染之前调用，此时不允许更新props或state

* componetDidUpdate
完成渲染新的props或state之后调用 ，此时可以访问DOM元素。

* componetWillUnmount
组件被移除之前调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。

```js
var React = require("react");
var ReactDOM = require("react-dom");

var NewView = React.createClass({
    //1.创建阶段
    getDefaultProps:function() {
        console.log("getDefaultProps");
        return {};
    },
    //2.实例化阶段
    getInitialState:function() {
        console.log("getInitialState");
        return {
            num:1
        };
    },
    //render之前调用，业务逻辑都应该放在这里，如对state的操作等
    componentWillMount:function() {
        console.log("componentWillMount");
    },
    //渲染并返回一个虚拟DOM
    render:function() {
        console.log("render");
        return(
            <div>
            hello <strong> {this.props.name} </strong>
            </div>
            );
    },
    //该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构
    componentDidMount:function() {
        console.log("componentDidMount");
    },
    //3.更新阶段
    componentWillReceiveProps:function() {
        console.log("componentWillReceiveProps");
    },
    //是否需要更新
    shouldComponentUpdate:function() {
        console.log("shouldComponentUpdate");
        return true;
    },
    //将要更新 不可以在该方法中更新state和props
    componentWillUpdate:function() {
        console.log("componentWillUpdate");
    },
    //更新完毕
    componentDidUpdate:function() {
        console.log("componentDidUpdate");
    },
    //4.销毁阶段
    componentWillUnmount:function() {
        console.log("componentWillUnmount");
    },
    // 处理点击事件
    handleAddNumber:function() {
        this.setProps({name:"newName"});
    }
});
ReactDOM.render(<NewView name="ReactJS"></NewView>, document.body);
```

讲一下所谓的React同构的黑科技吧

官方呢 给我们提供了2个方法用来让服务器进行渲染页面

* **React.renderToString** 是把 React 元素转成一个 HTML 字符串，因为服务端渲染已经标识了 reactid，所以在浏览器端再次渲染，React 只是做事件绑定，而不会将所有的 DOM 树重新渲染，这样能带来高性能的页面首次加载！同构黑魔法主要从这个 API 而来。

* **React.renderToStaticMarkup** 这个 API 相当于一个简化版的 renderToString，如果你的应用基本上是静态文本，建议用这个方法，少了一大批的 reactid，DOM 树自然精简了，在 IO 流传输上节省一部分流量。

当我们使用renderToString这个方法时候 后台渲染时会生成一段带标识的HTML字符串,当前端页面读取到JS时会判断如果HMTl字符串带标识,那么就不在渲染页面了,而是只绑定事件,节约了react脚本渲染的工作.

所以用户刷新页面时,会由后端进行渲染,发送HTML字符串到前端进行实践绑定,如果用户是在react内部点击切换链接,这时候是由react来进行渲染页面和填充页面.所以在不刷新页面时候,可以秒切换页面. 在用户刷新的时候,也不在需要等待JS加载完成才能显示界面,而是直接显示界面效果.这个就是同构的最大优势之一

理解了实现的原理, 我们还需要看下如何做**前后端界面同步**

我们看下如何实现

我们的界面层非常简单, 我们在client/view文件夹中创建一个文件, 用来写react的组件, 代码如下:

```js
"use strict";
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


import Nav from '../view/nav.js';
import LoginForm from '../view/components/login_form';

import logo_en from '../dist/img/text_logo.png';
import logo_cn from '../dist/img/text_logo_cn.png';

import '../dist/css/reset.css';
import Login from '../dist/css/login.css';
import Style from '../dist/css/style.css';

class App extends Component {
  constructor(props) {
    super(props);
	//初始化方法, 继承父级props方法
  }
  render() {
  //将HTML代码结构保存在内存中 然后渲染一段HTML代码
    return (
      <div>
        <Nav/>
        <div className={Login.banner}>
          <p className={Login.text_logo}>
            <img width="233" src={logo_en}/>
          </p>
          <p className={Login.text_logo_cn}>
            <img width="58" src={logo_cn}/>
          </p>
        </div>
        <LoginForm/>
        <div className={Login.form_reg}>
          还没有账号?
          <a href="#">立即注册 ListenLite</a>
        </div>
      </div>
    );
  }
};
export default App;
```
上面方法很简单,哪如何后端使用对应方法使用服务器渲染呢?一样非常简单,我们看代码:

```js
"use strict";

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {layout} from '../view/layout.js';
import {Provider} from 'react-redux';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'koa-passport';
import routes from '../../client/src/route/router.js';
import configureStore from '../../client/src/store/store.js';
import db from '../config/db.js';
import common from '../../common.json';
const User = db.User;

//get page and switch json and html
export async function index(ctx, next) {
  console.log(ctx.state.user, ctx.isAuthenticated());
  if (ctx.isAuthenticated()) {
    ctx.redirect('/');
  }
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
            //iinit store
            let loginStore = {
              user: {
                logined: ctx.isAuthenticated()
              }
            };
            const store = configureStore(loginStore);
            ctx.body = layout(renderToString(
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
          'message': '这个是登录页',
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
```

首先在server/containers文件夹中创建一个对应上面页面的控制器, 然后通过引入需要的方法

**import {renderToString, renderToStaticMarkup} from 'react-dom/server';**

这时候我们就可以在这里使用后台渲染功能了,我们可以看到, 在增加了渲染这部分内容, 我们可以直接将react的部分直接渲染为HTML代码串, 这里不详细阐述,之后会对这里综合其他同构部分详细解释, 这里只需要理解实现方法即可

```js
renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps}/>
              </Provider>
            ), store.getState()
```

生成的字符串如下
```html
<div data-reactroot="" data-reactid="1" data-react-checksum="978259924"><ul class="style_nav_2Lm" data-reactid="2"><li class="style_fl_10U" data-reactid="3"><a href
="/" data-reactid="4">首 页</a></li><li class="style_fl_10U" data-reactid="5"><a href="/404" data-reactid="6">串 流</a></li><li data-reactid="7"><a href="/" data-reactid="8"><i
class="style_logo_2Hq" data-reactid="9"></i></a></li><li class="style_login_visable_2GR" data-reactid="10"><img src="/dist/img/user_1.png" data-reactid="11"/><dl data-reactid="1
2"><a href="/" data-reactid="13"><dt data-reactid="14">我的主页</dt></a><a href="/" data-reactid="15"><dt data-reactid="16">我要上传</dt></a><a href="/logout" data-reactid="17">
<dt data-reactid="18">退出</dt></a></dl></li><li class="style_fr_Bxu" data-reactid="19"><a href="/reg" data-reactid="20"><b data-reactid="21">注 册</b></a></li><li class="style_
fr_Bxu" data-reactid="22"><a href="/login" data-reactid="23">登 录</a></li></ul><div class="login_banner_eub" data-reactid="24"><p class="login_text_logo_3fN" data-reactid="25">
<img width="233" src="/dist/img/text_logo.png" data-reactid="26"/></p><p class="login_text_logo_cn_iYZ" data-reactid="27"><img width="58" src="/dist/img/text_logo_cn.png" data-r
eactid="28"/></p></div><form data-reactid="29"><div class="login_tips_1nU" data-reactid="30"></div><ul class="login_form_HMj" data-reactid="31"><li data-reactid="32"><i class="l
ogin_segmentation_eZc" data-reactid="33"></i></li><li data-reactid="34"><b data-reactid="35">登录到 ListenLite</b></li><li class="login_form_border_3hw" data-reactid="36"><input
 type="text" name="username" value="" placeholder="用户名 / 邮箱" data-reactid="37"/></li><li class="login_form_pw_2rP" data-reactid="38"><input type="password" name="password"
value="" placeholder="密码" data-reactid="39"/></li><li data-reactid="40"><input type="checkbox" name="remmberPw" value="" class="login_remmber_input_28B" id="remmberPw" data-re
actid="41"/><label for="remmberPw" class="login_remmber_pw__H2" data-reactid="42">记住密码</label></li><li data-reactid="43"><button class="login_form_submit_2A1" disabled="" ty
pe="submit" data-reactid="44">登录</button></li></ul></form><div class="login_form_reg_32l" data-reactid="45"><!-- react-text: 46 -->还没有账号?<!-- /react-text --><a href="#" d
ata-reactid="47">立即注册 ListenLite</a></div></div>
```

这里我们可以看到, 我们这里直接渲染了页面组件, 但是并没有客户端中的index.js的外套层, 我们需在后端写一个document的外套用来包裹这些生成的代码,所以我们可以再server/view 中看到一个layout.js文件

```js
'use strict';

import common from '../../common.json';

exports.layout = function(content, data) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charSet='utf-8'/>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='renderer' content='webkit'/>
    <meta name='keywords' content='demo'/>
    <meta name='description' content='demo'/>
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    <link rel="stylesheet" href="/dist/css/style.css">
  </head>
  <body>
    <div id="root"><div>${content}</div></div>
  <script>
  window.__REDUX_DATA__ = ${JSON.stringify(data)};
  </script>
  <script src="${common.publicPath}dist/js/manifest.js"></script>
  <script src="${common.publicPath}dist/js/vendor.js"></script>
  <script src="${common.publicPath}dist/js/index.js"></script>
  </body>
  </html>
`;
};

```
这里很简单 就是将生成的内容填充到这个外套中

### 四.前端路由和后端路由的同步

当我们明白了React的生命周期和了解了服务器如何使用官方的2个方法实现服务器渲染功能, 我们看下如何架构前后端公用的路由

首先了解下React-router是什么?看下官方介绍

React Router 是完整的 React 路由解决方案

React Router 保持 UI 与 URL 同步。它拥有简单的 API 与强大的功能例如代码缓冲加载、动态路由匹配、以及建立正确的位置过渡处理。你第一个念头想到的应该是 URL，而不是事后再想起。

简单的说, 就是以前我们的路由控制, 例如页面的跳转等都是由后台控制的, 浏览器发送请求给后台服务器, 然后后台反馈内容, 现在由react-router接管了, 跳转放在了前端来执行, 为什么能实现, 正式因为HTML的新特性 History API
```
HTML5 新增的历史记录 API 可以实现无刷新更改地址栏链接，配合 AJAX 可以做到无刷新跳转。

简单来说：假设当前页面为renfei.org/，那么执行下面的 JavaScript 语句：

window.history.pushState(null, null, "/profile/");
之后，地址栏的地址就会变成renfei.org/profile/，但同时浏览器不会刷新页面，甚至不会检测目标页面是否存在。
```

那我们使用react-router在中间同构中做什么? 当然是为了实现前后端的路由同步而做的

* 在用户第一次访问页面时，由服务端路由处理，输出相关页面内容
* 客户端用户点击链接跳转，由客户端路由处理，渲染相关组件并展示
* 用户在前端跳转后刷新页面，此时被服务端路由截获，并由服务端处理渲染并返回* 页面内容

我们看下code:

前端路由的设置如下:
```js
const Routers = (
    <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/user" component={User}/>
        <Route path="/login" component={Login}/>
        <Route path="/reg" component={Reg}/>
      <Route path="/logout" component={Logout}/>
        <Route path="*" component={Page404}/>
    </Router>
	export default Routers;
);
```
可以看到我们使用的切换方法是browserHistory, 既HTML5的新特性, 但是对浏览器有要求, IE6-8并不支持, 还有一个是hashHistory, 他们的区别是hash的方式会在链接中增加 site.com/#/index的形式展现, 这是为了让浏览器的历史可以记住每次切换的页面, 也是用了锚点的特性

再看下服务器端的配置代码段:
```js
const router = new Router();

//Index page route
router.get('/', require('../containers/index.js').index);
//404 page route
router.get('/user', require('../containers/user.js').index);
router.get('/get_user_info', require('../containers/user.js').getUserInfo);
//User page route
router.get('/404', require('../containers/404.js').index);
//Login page route
router.get('/login', require('../containers/login.js').index);
router.post('/login', require('../containers/login.js').login);
router.get('/logout', require('../containers/login.js').logout);

//Reg page route
router.get('/reg', require('../containers/reg.js').index);
router.post('/reg_user', require('../containers/reg.js').reg);
router.post('/vaildate_user', require('../containers/reg.js').vaildate_user);
router.post('/vaildate_email', require('../containers/reg.js').vaildate_email);
//set a router
module.exports = router.routes()
```
 我们的服务器使用的是koa2, 所以附带的路由也是对应的koa-router, 由于后台架构是MVC结构,我们看下路由读取的控制器层的代码段

```js
import routes from '../../client/src/route/router.js';

export async function index(ctx,next) {
    console.log(ctx.state.user,ctx.isAuthenticated());
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
                        //iinit store
                        let loginStore = {user:{logined:ctx.isAuthenticated()}};
                        const store = configureStore(loginStore);
                        console.log(store.getState());
                        ctx.body = layout(renderToString(
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
```

我们看到这里使用了react-router的match方法, 这个方法可以自动读取前端的路由文件,并通过匹配该路径读取的模块反馈模块代码, 并通过react服务器渲染进行直出

这里可以看到路由的设计, 在后端使用了koa2, 所以可以对请求的类型进行判断,这样充分利用了链接的优势, 可以请求同一个地址, 由于请求类型的不同, 判断是html还是json,反馈不同的数据结构, 这样就做到了路由的富应用

### 五.前端状态控制及后端状态控制的同步

**什么是redux**

Redux 提供了一套类似 Flux 的单向数据流，整个应用只维护一个 Store，以及面向函数式的特性让它对服务器端渲染支持很友好。

官方的建议呢就是, 如果不需要使用就不使用, 但是我在开发使用中, 发现当应用年开发复杂时, 使用了Redux, 就会发现是真的好用. 正如我们知道, 当我们需要修改react状态或者界面时,不是直接操作DOM结构,而已是操作state,从而达到更新DOM的方式 , 但是一旦程序变得复杂, 就无法在进行维护和修改了, 会非常复杂. 而使用了Redux, 由于所有组件状态放在最顶层上统一控制, 从而减少了各个组件的状态交互, 减少了程序的耦合, 增加了程序的可维护性.

在刚开始使用时, redux确实很难理解, 尤其是他的Flux架构, 但是当你仔细看完官方文档就明白了, 其实是很简单的对数据处理, 这里所有数据状态处理都由action和reducer来操作,其他地方不允许操作数据, 从而保证了数据的一致性. 并可以实现对各种状态的保存, 从而可以回到之前的任意状态, 这对这些复杂的应用, 甚至是一些游戏应用来说, 真的是非常爽快的事情.

我们看下如何使用redux和react-redux实现状态的统一

服务端绑定入口页面代码:

```js
let store = configureStore(window.__REDUX_DATA__);
const renderIndex = () => {
    render((
      <div>
        <Provider store={store}> {*这里添加一个Provider外套, 使react顶层组件用来保存store状态,用来统一管理所有子组件的状态管理*}
            {routes}
        </Provider>
      </div>
    ), document.getElementById('root'))
};
renderIndex();
store.subscribe(renderIndex);
{*这里为组件绑定监听事件, 当状态改变时就会修改统一的store*}
```

服务器端为了实现状态的同步, 并可以在用户刷新页面时, 保证页面中读取的状态是上一次最新的状态, 在这里需要使用客户端的创建方法记性store的创建

server/containers/login.js 
```js
//引用客户端创建初始store方法
import configureStore from '../../client/src/store/store.js';

  let loginStore = {
              user: {
                logined: ctx.isAuthenticated() ///初始从服务器中读取用户登录状态,并保存为一个状态
              }
            };
            const store = configureStore(loginStore);
			//通过客户端方法将初始state传递到前端页面
            ctx.body = layout(renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps}/>
              </Provider>
            ), store.getState());
```
最后我们通过将该状态传递个一个window对象存储, 从而直出到前端页面, 并读取状态生成对应的界面效果, 见代码:

server/view/layout.js
```html
<script>
  window.__REDUX_DATA__ = ${JSON.stringify(data)};
 </script>
```

### 六.服务器的选择 - koa2

至此, 我们基本明白了三大同构的用处, 明白了为什么要这样做和怎么做, 我们看下服务器端的架构和使用的一些组件

在服务器框架这边使用, 在express和koa中最终选择了koa2, 为什么选它, 原因很简单, 更轻巧的架构, 更好的中间件机制和强力的性能, 而且也使用了ES6的标准编写, 为我使用ES6的新特性都非常友好.

首先是启动一个服务器, 我们在根目录创建一个app.js文件,然后写上对应的code就会创建一个koa的服务器

```js
const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
```

其他koa的相关文档, 请查阅官方的中文文档, 这里列一下使用的各种中间件

### 七.一些koa中间件的介绍和用途

```js
  router = require('koa-router')(),
```
koa的必备中间件, 通过使用该组件, 可以自己在服务器端进行后端路由的设置, 通过设置路由, 完成不同请求(GET,POST,DELETE,PUT等)的服务器状态, 返回请求body中的内容的设置等

```js
logger = require('koa-logger'),
```
koa的服务器记录插件,可以输出各种请求报错等信息的输出, 主要用来调试和监控服务器状态

```js
  bodyParser = require('koa-bodyparser')
```

这个插件需要说一下, 我在使用表单请求时, koa无法拿到对应的表单信息, 所以需要引用这组件用来解析body的中间件，比方说你通过post来传递表单，json数据，或者上传文件，在koa中是不容易获取的，通过koa-bodyparser解析之后，在koa中this.body就能直接获取到数据。

数据库方面操作方面使用了Sequelize, 可以对多种数据库进行操作, 并且使用了类似MongoDB一样的操作方法, 使用起来非常便捷,详细见 server/models

### 八.用户权限验证 passport

在身份验证方面, 我们选择了Nodejs 最常用的权限验证组件, 这个组件还支持OAuth , OAuth2 及OpenID等标准的登录.





<h2 align="center">开发日记</h2>
当开发中遇到的问题,我会列在下面,以方便自己查询和其他人进行相同问题的修改和修复


<h2 align="center">React使用中遇到的相关问题</h2>


**问题**

```
谷歌报错 Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the App component.
```

**原因**

```
原因是未及时清除掉定时器或者变量,造成了报错会造成内存溢出|使用this定义变量,然后用componentWillUnmount()中清除定时器,方法见官方定时器demo,如下:
```

**解决方案**

```js
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsElapsed: 0};
  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
}
ReactDOM.render(<Timer />, mountNode);
```

**问题**

```
谷歌报错 ReactDOMComponentTree.js:113 Uncaught TypeError: Cannot read property '__reactInternalInstance$xvrt44g6a8' of null
    at Object.getClosestInstanceFromNode.
和
Uncaught RangeError: Maximum call stack size exceeded
```

**原因**

```
未知,可能是图片重复使用或者堆栈造成内存溢出和报错
```

**解决方案**

```js
将
render((
    <Provider store={store}>
        {routes}
    </Provider>
), document.getElementById('root'));
改为
render((
  <div>
    <Provider store={store}>
        {routes}
    </Provider>
  </div>
), document.getElementById('root'));
```

<h2 align="center">NodeJS后端及服务器端遇到的问题</h2>

**问题**

```
如何在后端运行时,忽略css文件,防止nodejs后端服务器报错|node服务器不能正确解析css文件,所以会出现报错|使用**asset-require-hook**插件排除css,也可以排除sass文件,防止nodejs读取css报错.
```
**原因**

```
前后端生成的css-modules不同,造成了部署到服务器时,会造成读不到样式,然后页面闪现问题|原因是由于使用的组件**css-modules-require-hook**也是根据css-modules的机制,以file-path路径进行生成的hash,所以由于css-modules-require-hook和webpack的目录不同,所以造成了生成的hash不一样只的问题|只需要在css-modules-require-hook组件中使用rootDir,将两个目录一致即可
```

**解决方案**

```
后端React 使用renderToString渲染 图片路径变为hash码名称|原因是由于Nodejs加载文件时,会自动转为hash名称|使用插件asset-require-hook钩子来返回正确的图片名称
```
```js
require('asset-require-hook')({
  extensions: [
    'jpg', 'png', 'gif', 'webp'
  ],
  name: '[name].[ext]',
  limit: 2000
});
```
<h2 align="center">后端权限验证类</h2>

**问题**

```
使用passport时,一直无法写入cookie,并无法验证通过
```

**原因**

```
原因是由于没有在执行代码的时候,写入await让验证操作执行完在进行后续操作,造成了问题
```
**解决方案**

```
只需要增加await,等待异步执行完成后传接成功内容给http body,代码如下:
```
```js
 await passport.authenticate('local', function(err, user, info, status) {.....}
```


<h2 align="center">协议</h2>
MIT
