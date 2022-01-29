<p align="center"><img width="80" src="https://pt-starimg.didistatic.com/static/starimg/img/BSHOVw2pyT1620726744938.png" alt="LOGO"></p>
<h2 align="center">mand-mobile</h2> 
<p align="center">A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios</p>
<p align="center">
  <a href="https://travis-ci.org/didi/mand-mobile"><img src="https://img.shields.io/travis/didi/mand-mobile/master.svg?style=flat-square" alt="Build Status"></a>
  <a href="https://codecov.io/gh/didi/mand-mobile"><img src="https://img.shields.io/codecov/c/github/didi/mand-mobile/master.svg?style=flat-square" alt="codecov"></a>
  <a href="https://www.npmjs.org/package/mand-mobile"><img src="https://img.shields.io/npm/v/mand-mobile.svg?style=flat-square" alt="npm package"></a>
  <a href="https://www.npmjs.org/package/mand-mobile"><img src="http://img.shields.io/npm/dm/mand-mobile.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://www.jsdelivr.com/package/npm/mand-mobile"><img src="https://data.jsdelivr.com/v1/package/npm/mand-mobile/badge" alt="jsdelivr"></a>
  <a href="https://www.npmjs.org/package/mand-mobile"><img src="https://img.shields.io/npm/l/mand-mobile.svg?style=flat-square" alt="License"></a>
  <br/>
  <a href="https://unpkg.com/mand-mobile/"><img src="http://img.badgesize.io/https://unpkg.com/mand-mobile/lib/mand-mobile.umd.js?compression=gzip&label=gzip%20size:%20JS&style=flat-square" alt="gzip js size"></a>
  <a href="https://unpkg.com/mand-mobile/"><img src="http://img.badgesize.io/https://unpkg.com/mand-mobile/lib/mand-mobile.css?compression=gzip&label=gzip%20size:%20CSS&style=flat-square" alt="gzip css size"></a>
</p>
<p align="center"><img src="https://pt-starimg.didistatic.com/static/starimg/img/toa8XOspJG1555486253802.png" width="800"></p>
<br/>

**English** | [中文](./README.zh-CN.md)

## Links

* [Home](https://didi.github.io/mand-mobile/)
* [Development Guide](site/docs/development.md)
* [Change Log](CHANGELOG.md)
* [Examples](https://didi.github.io/mand-mobile/examples/)
* [Palette](https://github.com/mand-mobile/palette)
* [Mand Mobile Organization](https://github.com/mand-mobile)

## Preview

You can scan the following QR code to access the examples:

<img src="https://manhattan.didistatic.com/static/manhattan/mand-mobile/2.0/docs/mand-doc-home-qrcode.png" alt="Mand Mobile Examples" width="200"/>

## Install & Usage

### Template for new project

#### Vue CLI 2
New project can be initialized and integrated with mand-mobile by [vue-cli-2](https://github.com/vuejs/vue-cli/tree/v2) with [mand-mobile-template](https://github.com/mand-mobile/mand-mobile-template).

```bash
vue init mand-mobile/mand-mobile-template my-project
```

#### Vue CLI 3
New project can be initialized and integrated with mand-mobile by [vue-cli](https://github.com/vuejs/vue-cli/tree/master) with [vue-cli-plugin-mand](https://github.com/mand-mobile/vue-cli-plugin-mand).

```bash
vue create my-project
cd my-project
npm install --save-dev vue-cli-plugin-mand
vue invoke mand
```

### Manually

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

### Usage

Select the components you need to build your webapp. Find more details in [Quick Start](https://didi.github.io/mand-mobile/#/en-US/docs/started).

## Development

```bash
git clone git@github.com:didi/mand-mobile.git
cd mand-mobile
npm install
npm run dev
```
Open your browser and visit http://127.0.0.1:4000. Find more details in [Development Guide](https://didi.github.io/mand-mobile/#/en-US/docs/development).

## Contributing [![PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/didi/mand-mobile/pulls)
Welcome to contribute by creating issues or sending pull requests. See [Contributing Guide](CONTRIBUTING.md) for guidelines.

## Community

<img src="https://pt-starimg.didistatic.com/static/starimg/img/tuDKFjM2at1640157275725.png" alt="Mand Mobile Community" width="200"/>

## License
Mand Mobile is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file.

## Useful Links

* [Hummer](https://github.com/didi/Hummer) is a set of high-performance and highly available cross-terminal development framework, a set of code can support the development of Android and iOS applications at the same time. Now supports Vue/TypeScript/JavaScript, for front-end developers, there is always one suitable for you.

* [DoraemonKit](https://github.com/didi/DoraemonKit) /'dɔ:ra:'emɔn/: A full-featured App (iOS & Android) development assistant. You deserve it.

* [Chameleon](https://github.com/didi/chameleon) /kəˈmiːlɪən/: Unify all platforms(Web/Weex/Mini program) with MVVM. Focus on Write Once Run AnyWhere.
