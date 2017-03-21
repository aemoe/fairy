### Fairy

```
※ 为什么叫这个名字?

因为这是一份送给一直叫Fairy Mo(美人)的猫的礼物

※ 这个框架是什么?

是一个能够支持前后端分离并支持中间层同构的完整框架,或许现在它还不够完善,但是我会把构建该框架中遇到的问题都列出来,以方便其他人遇到问题不在需要去到处搜索问题,希望为自己搭建框架的人有一些帮助,也希望最后是一个完整而又完美的框架

如果这些问题你也遇到了,请点个start,感谢~ ~

```


#####更新日志

之前遇到的问题

```
问题:如何在后端运行时,忽略css文件,防止nodejs后端服务器报错

解决方法:使用asset-require-hook插件排除css,也可以排除sass文件,防止nodejs读取css报错.
```

3月18日

```js
问题:使用passport时,一直无法写入cookie,并无法验证通过

解决方法:原因是由于没有在执行代码的时候写入await让验证操作执行完在进行后续操作,造成了问题

await passport.authenticate('local', function(err, user, info, status) {
    .....
}
```

3月21日

```
问题:前后端生成的css-modules不同,造成了部署到服务器时,会造成读不到样式,然后页面闪现问题

解决方法:
原因是由于使用的组件css-modules-require-hook也是根据css-modules的机制,以file-path路径进行生成的hash,所以由于css-modules-require-hook和webpack的目录不同,所以造成了生成的hash不一样只的问题

解决方法,只需要在css-modules-require-hook组件中使用rootDir,将两个目录一致即可

[资料地址](https://github.com/css-modules/css-modules-require-hook/issues/86)
```
后续陆续更新中...
