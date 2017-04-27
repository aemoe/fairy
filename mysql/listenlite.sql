-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2017-04-27 12:40:07
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `listenlite`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(20) UNSIGNED NOT NULL COMMENT 'ID号，自动递增，设置为主键',
  `username` char(20) NOT NULL COMMENT '用户名，最长20个字符',
  `nickname` char(20) DEFAULT '' COMMENT '呢称，最长20个字符',
  `password` text NOT NULL COMMENT '密码字段，使用bcrypt加密,然后对比后判断是否相同！',
  `identifier` char(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '将用户第二特征码写入，cookie的时候',
  `token` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用来保存用户上一次登陆时的随机码，用来判断是否自动登陆',
  `email` char(32) NOT NULL COMMENT '注册时的电子邮箱',
  `regip` char(15) NOT NULL COMMENT '注册时的IP地址',
  `regdate` int(10) UNSIGNED NOT NULL COMMENT '注册时的日期',
  `lastip` char(15) NOT NULL COMMENT '上次登录IP地址',
  `lastdate` int(10) UNSIGNED NOT NULL COMMENT '上次登录的日期',
  `UsActiveCode` char(36) NOT NULL COMMENT '激活码，GUID',
  `UsActiveTime` int(10) NOT NULL COMMENT '用来存放激活/解锁的有效时间，从邮件发送后开始算，现暂时是24小时，以Unix的TimeStamp来计算',
  `UsMark` int(2) NOT NULL DEFAULT '2' COMMENT '用户状态标记，0是删除，1是正常，2是未激活，3是锁定。默认是未激活',
  `UsAuthorityStr` char(200) NOT NULL COMMENT '权限标记，128位，1是有权限，0是没有'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表，存放基本信息（登录名/密码等）';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID号，自动递增，设置为主键';
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
