[English](./README.md) | **中文**
<div align="center">
  <a href="#">
    <img width="80" src="https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg" alt="LOGO">
  </a>
</div>
<br>
<div align="center">
    <a href="http://forthebadge.com">
        <img src="http://forthebadge.com/images/badges/made-with-vue.svg">
    </a>
    <a href="http://forthebadge.com">
        <img src="http://forthebadge.com/images/badges/built-with-love.svg">
    </a>
    <a href="http://forthebadge.com">
        <img src="http://forthebadge.com/images/badges/makes-people-smile.svg">
    </a>
</div>

# mand-mobile

[![Build Status](https://travis-ci.org/didi/mand-mobile.svg?branch=master)](https://travis-ci.org/didi/mand-mobile)
[![codecov](https://codecov.io/gh/didi/mand-mobile/branch/master/graph/badge.svg)](https://codecov.io/gh/didi/mand-mobile)
[![npm package](https://img.shields.io/npm/v/mand-mobile.svg?style=flat-square)](https://www.npmjs.org/package/mand-mobile)
[![NPM downloads](http://img.shields.io/npm/dm/mand-mobile.svg?style=flat-square)](http://npmtrends.com/mand-mobile)

面向金融场景的移动端UI组件库，基于Vue.js实现。

## 链接

* [首页](https://didi.github.io/mand-mobile/)
* [开发指南](site/docs/development.md)
* [更新日志](CHANGELOG.md)
* [示例集合](https://didi.github.io/mand-mobile/examples/)

## 预览

扫描下方二维码，打开示例集合进行预览:

<img src="https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-qrcode.png?v=2" alt="Mand Mobile Examples" width="200"/>

## 安装 & 使用

### 新项目模板

新项目可使用[vue-cli](https://github.com/vuejs/vue-cli/tree/master)通过[mand-mobile-template](https://github.com/mand-mobile/mand-mobile-template)进行初始化。

```bash
vue init mand-mobile/mand-mobile-template my-project
```

### 安装

```bash
npm install mand-mobile --save
```

### 引入

* 使用 <a href="https://github.com/ant-design/babel-plugin-import" target="_blank">babel-plugin-import</a>
  或
  <a href="https://github.com/Brooooooklyn/ts-import-plugin" target="_blank">ts-import-plugin</a> (推荐)

```javascript
import { Button } from 'mand-mobile'
```

* 按需引入

```javascript
import Button from 'mand-mobile/lib/button'
```

* 全量引入

```javascript
import Vue from 'vue'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

Vue.use(mandMobile)
```

### CDN

```
<link rel="stylesheet" href="https://unpkg.com/mand-mobile/lib/mand-mobile.css">
<script src="https://unpkg.com/mand-mobile/lib/mand-mobile.umd.js"></script>
```

### 使用

选择需要的组件开始构建您的webapp，详细内容请查看[组件预览](https://didi.github.io/mand-mobile/#/docs/preview)和[快速上手](https://didi.github.io/mand-mobile/#/docs/started)。

## 开发

```bash
git clone git@github.com:didi/mand-mobile.git
cd mand-mobile
npm install
npm run dev
```
打开浏览器访问http://127.0.0.1:4000， 详细内容请查看[开发指南](https://didi.github.io/mand-mobile/#/docs/development)。

## 贡献

如有任何的意见或建议，欢迎您通过创建Issue或Pull Request的方式告知我们，请先阅读[贡献指南](CONTRIBUTING.md)。

## 证书
Mand Mobile使用Apache License 2.0，查看[证书](LICENSE)。
