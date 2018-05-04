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

A mobile UI toolkit, based on `Vue.js 2`, designed for financial scenes.

## Links

* [Home](https://didi.github.io/mand-mobile/)
* [Developer Instruction](site/docs/development.md)
* [Theme Customization](site/docs/theme.md)
* [Change Log](CHANGELOG.md)
* [Examples](https://didi.github.io/mand-mobile/examples/)

![Examples Link](https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-home-qrcode.png?v=2)

## Install & Usage

### Install

```shell
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

Select the components that you need to build your webapp. Find more details in [component preview](https://didi.github.io/mand-mobile/#/docs/preview).

```vue
<template>
  <div id="app">
    <md-field title="form" class="block">
      <md-input-item
        title="name"
        placeholder="Please input your name."
      ></md-input-item>
      <md-field-item
        title="sex"
        arrow="arrow-right"
        :value="sex"
        @click="isPickerShow = true"
        solid
      ></md-field-item>
      <md-picker
        v-model="isPickerShow"
        :data="pickerData"
        title="sex"
      ></md-picker>
    </md-field>
    <md-agree class="agree">
      Agree to the privacy policy.
    </md-agree>
    <md-action-bar :actions="actionBarData">
      &yen;128.00
    </md-action-bar>
  </div>
</template>

<script>
import {
  Agree,
  ActionBar,
  Field,
  FieldItem,
  InputItem,
  Picker
} from 'mand-mobile'

export default {
  name: 'app',

  components: {
    [Agree.name]: Agree,
    [ActionBar.name]: ActionBar,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Picker.name]: Picker
  },

  data () {
    return {
      isPickerShow: false,
      actionBarData: [{
        text: 'confirm'
      }],
      pickerData: [
        [
          { text: 'male' },
          { text: 'female' }
        ]
      ]
    }
  }
}
</script>
```

## Development

```shell
git clone git@github.com:didi/mand-mobile.git
cd mand-mobile
npm install
npm run dev
```
Open your browser and visit http://127.0.0.1:4000. Find more details in [development guide](https://didi.github.io/mand-mobile/#/docs/development).

## Contributing
Welcome to contribute by creating issues or sending pull requests. See [Contributing Guide](CONTRIBUTING.md) for guidelines.

## License
Mand Mobile is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file.
