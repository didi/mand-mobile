<div align="center">
  <a href="#">
    <img width="80" src="./assets/logo.png" alt="LOGO">
  </a>
</div>
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

[![](https://img.shields.io/travis/didi/mand-mobile.svg?style=flat-square)](https://travis-ci.org/adidi/mand-mobile)
[![Codecov](https://img.shields.io/codecov/c/github/didi/mand-mobile/master.svg?style=flat-square)](https://codecov.io/gh/didi/mand-mobile/branch/master)
[![npm package](https://img.shields.io/npm/v/mand-mobile.svg?style=flat-square)](https://www.npmjs.org/package/mand-mobile)
[![NPM downloads](http://img.shields.io/npm/dm/mand-mobile.svg?style=flat-square)](http://npmtrends.com/mand-mobile)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/didi/mand-mobile.svg)](http://isitmaintained.com/project/didi/mand-mobile "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/didi/mand-mobile.svg)](http://isitmaintained.com/project/didi/mand-mobile "Percentage of issues still open")

A mobile UI toolkit, based on `Vue.js 2`, designed for financial scenes.

## Links

* [Home](https://didi.github.io/mand-mobile/)
* [Developer Instruction](site/docs/development.md)
* [Theme Customization](site/docs/theme.md)
* [Change Log](CHANGELOG.md)
* [Examples](https://didi.github.io/mand-mobile/example/)

![Examples Link](./assets/examples-qrcode.png)

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
import 'mand-mobile/lib/button/style'
```

* Totally import

```javascript
import Vue from 'vue'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

Vue.use(mandMobile)
```

### Usage

Select the components that you need to build your webapp. Find more details in [component preview](/mfe/mand-mobile/docs/preview).

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
      pickerData: [[{text:'male'},{text:'female'}]]
    }
  }
}
</script>
```
