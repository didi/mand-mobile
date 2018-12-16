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

[![Build Status](https://img.shields.io/travis/didi/mand-mobile/master.svg?style=flat-square)](https://travis-ci.org/didi/mand-mobile)
[![codecov](https://img.shields.io/codecov/c/github/didi/mand-mobile/master.svg?style=flat-square)](https://codecov.io/gh/didi/mand-mobile)
[![npm package](https://img.shields.io/npm/v/mand-mobile.svg?style=flat-square)](https://www.npmjs.org/package/mand-mobile)
[![License](https://img.shields.io/npm/l/mand-mobile.svg?style=flat-square)](https://www.npmjs.org/package/mand-mobile)<br>
[![npm downloads](http://img.shields.io/npm/dm/mand-mobile.svg?style=flat-square)](http://npmtrends.com/mand-mobile)
[![gzip js size](http://img.badgesize.io/https://unpkg.com/mand-mobile/lib/mand-mobile.umd.js?compression=gzip&label=gzip%20size:%20JS&style=flat-square)](https://unpkg.com/mand-mobile/)
[![gzip css size](http://img.badgesize.io/https://unpkg.com/mand-mobile/lib/mand-mobile.css?compression=gzip&label=gzip%20size:%20CSS&style=flat-square)](https://unpkg.com/mand-mobile/)

面向金融场景的移动端UI组件库，基于Vue.js实现。

### 🎉🎉🎉 Mand Mobile 2.0, [立即体验](https://mand-mobile.github.io/2x-doc/)

## 链接

* [首页](https://didi.github.io/mand-mobile/)
* [开发指南](site/docs/development.md)
* [更新日志](CHANGELOG.md)
* [示例集合](https://didi.github.io/mand-mobile/examples/)
* [调色板](https://github.com/mand-mobile/palette)
* [更多](https://github.com/mand-mobile)

## 预览

扫描下方二维码，打开示例集合进行预览:

<img src="https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-qrcode.png?v=2" alt="Mand Mobile Examples" width="200"/>

## 安装 & 使用

### CLI

#### Vue CLI 2
通过[mand-mobile-template](https://github.com/mand-mobile/mand-mobile-template)创建新项目。

```bash
vue init mand-mobile/mand-mobile-template my-project
```

#### Vue CLI 3
通过[vue-cli-plugin-mand](https://github.com/mand-mobile/vue-cli-plugin-mand)向 Vue CLI 3 新建的项目里初始化。(默认支持按需引用)

```bash
vue create my-project
cd my-project
npm install --save-dev vue-cli-plugin-mand
vue invoke mand
```

### 手动安装
在已有项目里手动安装 Mand Mobile 的包。

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

## 贡献 [![PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/didi/mand-mobile/pulls)

如有任何的意见或建议，欢迎您通过创建Issue或Pull Request的方式告知我们，请先阅读[贡献指南](CONTRIBUTING.md)。

## 社区

<img src="https://pt-starimg.didistatic.com/static/starimg/img/KitzF6QlrR1543994331272.jpg" alt="Mand Mobile Community" width="200"/>

## 证书
Mand Mobile使用Apache License 2.0，查看[证书](LICENSE)。
