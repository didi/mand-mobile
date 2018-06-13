**English** | [中文](./README.zh-CN.md)
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

A mobile UI toolkit, based on Vue.js 2, is designed for financial scenarios. 

## Links

* [Home](https://didi.github.io/mand-mobile/)
* [Development Guide](site/docs/development.md)
* [Change Log](CHANGELOG.md)
* [Examples](https://didi.github.io/mand-mobile/examples/)
* [Palette](https://github.com/mand-mobile/palette)
* [More](https://github.com/mand-mobile)

## Preview

You can scan the following QR code to access the examples:

<img src="https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-qrcode.png?v=2" alt="Mand Mobile Examples" width="200"/>

## Install & Usage

### Template for new project

New project can be initialized and integrated with  mand-mobile by [vue-cli](https://github.com/vuejs/vue-cli/tree/master) with [mand-mobile-template](https://github.com/mand-mobile/mand-mobile-template).

```bash
vue init mand-mobile/mand-mobile-template my-project
```

### Install

```bash
npm install mand-mobile --save
```

### Import

* Use <a href="https://github.com/ant-design/babel-plugin-import" target="_blank">babel-plugin-import</a>
  or
  <a href="https://github.com/Brooooooklyn/ts-import-plugin" target="_blank">ts-import-plugin</a> (Recommended)

```javascript
import { Button } from 'mand-mobile'
```

* Manually import

```javascript
import Button from 'mand-mobile/lib/button'
```

* Totally import

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

### Usage

Select the components you need to build your webapp. Find more details in [Component Preview](https://didi.github.io/mand-mobile/#/docs/preview) and [Quick Start](https://didi.github.io/mand-mobile/#/docs/started).

## Development

```bash
git clone git@github.com:didi/mand-mobile.git
cd mand-mobile
npm install
npm run dev
```
Open your browser and visit http://127.0.0.1:4000. Find more details in [Development Guide](https://didi.github.io/mand-mobile/#/docs/development).

## Contributing
Welcome to contribute by creating issues or sending pull requests. See [Contributing Guide](CONTRIBUTING.md) for guidelines.

## License
Mand Mobile is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file.
