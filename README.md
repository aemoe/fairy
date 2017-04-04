
<div align="center">
  <a href="https://github.com/aemoe/fairy">
    <img width="100" heigth="100" src="doc/img/logo.png">
  </a>
  <h2>Fairy - 一个前后端分离框架 </h2>
  <p align="left">
  一个能够支持前后端分离并支持中间层同构的完整框架,或许现在它还不够完善,但是我会把构建该框架中遇到的问题都列出来,以方便其他人遇到问题不在需要去到处搜索问题,希望为自己搭建框架的人有一些帮助,也希望最后成为一个完整而又完美的框架,如果这些问题你也遇到了,请点个star,感谢~ ~
  <p>
</div>

<h2 align="center">框架名字</h2>

#### 为什么叫这个名字?

因为这是一份送给一只名叫Fairy Mo(美人)的猫的礼物 ~

<h2 align="center">计划执行</h2>

- [x] 路由同步 React-router及Koa-router同步
- [x] 模板同步 View层同步,使用react-dom/server实现
- [x] 数据同步 使用Redux及React-redux实现
- [x] css-modules同步 保证前后端生成的css-modules相同
- [ ] react-router按需加载
- [ ] webpack热加载组件优化

<h2 align="center">怎么安装</h2>

```bash
npm i
npm start
```

**框架特点**

* 路由同步(前后端共用一套路由)
* 模板同步(前后端共用一套模板)
* 数据同步(前后端公用一套数据状态机)

<h2 align="center">开发日记</h2>
当开发中遇到的问题,我会列在下面,以方便自己查询和其他人进行相同问题的修改和修复

#### React使用中遇到的相关问题

|问题|原因|解决方法|
|:--:|:----:|:----------|
|谷歌报错 Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the App component.|原因是未及时清除掉定时器或者变量,造成了报错会造成内存溢出|使用this定义变量,然后用componentWillUnmount()中清除定时器,方法见官方定时器demo,如下:|
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

#### NodeJS后端及服务器端遇到的问题

|问题|原因|解决方法|
|:--|:--|:--|
|如何在后端运行时,忽略css文件,防止nodejs后端服务器报错|node服务器不能正确解析css文件,所以会出现报错|使用**asset-require-hook**插件排除css,也可以排除sass文件,防止nodejs读取css报错.|
|前后端生成的css-modules不同,造成了部署到服务器时,会造成读不到样式,然后页面闪现问题|原因是由于使用的组件**css-modules-require-hook**也是根据css-modules的机制,以file-path路径进行生成的hash,所以由于css-modules-require-hook和webpack的目录不同,所以造成了生成的hash不一样只的问题|只需要在css-modules-require-hook组件中使用rootDir,将两个目录一致即可|

#### 后端权限验证类

|问题|原因|解决方法|
|:--|:--|:--|
|使用passport时,一直无法写入cookie,并无法验证通过|原因是由于没有在执行代码的时候,写入await让验证操作执行完在进行后续操作,造成了问题|只需要增加await,等待异步执行完成后传接成功内容给http body,代码如下: <br> await passport.authenticate('local', function(err, user, info, status) {.....} |

<h2 align="center">协议</h2>
MIT
