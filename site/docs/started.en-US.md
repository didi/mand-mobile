---
title: Quickstart
---

#### Scaffold

**New project** can be initialized and integrated with `mand-mobile` by [vue-cli](https://github.com/vuejs/vue-cli). Please refer to <a href="javascript:jumpAnchor('Installation')">Installation</a> for **existing projects**.

* vue cli 2.0([Template](https://github.com/mand-mobile/mand-mobile-template))

```bash
npm install -g vue-cli
vue init mand-mobile/mand-mobile-template my-mand-mobile-project
```

* vue cli 3.0(See [example](https://github.com/mand-mobile/mand-mobile-vue-cli3-example))

```bash
npm install -g @vue/cli
vue create my-mand-mobile-project
```

#### Installation

##### NPM

```bash
npm install mand-mobile --save
```

##### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/mand-mobile/lib/mand-mobile.css">

<!-- window['mand-mobile'] -->
<script src="https://unpkg.com/mand-mobile/lib/mand-mobile.umd.js"></script>
```

#### Import

##### On-demand Loading(Recommended)

> Use <a href="https://github.com/ant-design/babel-plugin-import" target="_blank">babel-plugin-import</a>
  or
  <a href="https://github.com/Brooooooklyn/ts-import-plugin" target="_blank">ts-import-plugin</a>. No need to configure style path and default directory is 'lib', other directory reference #Release Package Directory

```javascript
{
  "plugins": [
    ["import", {
      "libraryName": "mand-mobile",
      "libraryDirectory": "lib"
    }]
  ]
}
```

```javascript
// ts-loader option
{
  rules: [
  	{
	   test: /\.tsx?$/,
	   loader: 'ts-loader',
	   options: {
	     appendTsSuffixTo: [/\.vue$/],
	     transpileOnly: true,
	     getCustomTransformers: () => ({
	       before: [
            require('ts-import-plugin')({
              "libraryName": "mand-mobile"
            })
	       ]
	     })
	   }
    }
  ]
}
```

and then

```javascript
import { Button } from 'mand-mobile'

/**
 * [Note] If there is no configuration above, it will be imported in full amount, 
 * all styles need to be manually imported, and reference #Totally Import.
 */
```

##### Manually Import

```javascript
import Button from 'mand-mobile/lib/button'
```

##### Totally Import

```javascript
import Vue from 'vue'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

Vue.use(mandMobile)
```

#### Prepare Before Use

##### Normalize

To make browsers render all elements more consistently and in line with modern standards，[Normalize.css](http://necolas.github.io/normalize.css/) is recommended to import.

##### FastClick

To avoid click problems caused by [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile), [FastClick](https://github.com/ftlabs/fastclick) is recommended to import.

##### Release Package Directory

[Release Package](https://unpkg.com/mand-mobile/) includes the following different directories, which are applicable in different scenarios. You can select one directory to load according to actual needs：

```
├── mand-mobile
    ├── components  # Source code, custom theme, etc
    |
    ├── lib         # After compilation, style unit 'px', generally used 
    |               # for custom fit programs, etc (default)
    ├── lib-vw      # After compilation, style unit 'vh/vw', generally used 
    |               # in non-compatible scenarios, without additional configuration
    ├── ...
```

##### `Px` to `Rem`

Component style is in `px` units and referenced to the `iPhone 6` screen, whose "physical pixel" width is `750` (that is, `2` times the size of the normal "logical pixel"). In actual projects, you can use `postcss-pxtorem` to convert `px` to `rem` depending on the exact situation, so as to achieve the effect of equal scaling in different devices.

For example `1rem = 100px`:

* Configuration of `.postcssrc.js`

```javascript
module.exports = {
  'plugins': [
    require('postcss-pxtorem')({
      rootValue: 100,
      propWhiteList: []
    })
  ]
}
```

* Configuration of `webpack`

```javascript
const pxtorem = require('postcss-pxtorem');

// Postcss
webpackConfig.postcss.push(pxtorem({
  rootValue: 100,
  propWhiteList: []
}))

// Poststylus（When using source code）
const poststylus = require('poststylus')

webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({
  options: {
    stylus: {
      use: [
        poststylus(pxtorem({
          rootValue: 100,
          propWhiteList: []
        }))
      ]
    }
  }
}))
```

#### Usage

This is a form page developed by `Mand Mobile`. More components can be found in <a href="#/docs/preview">Component Preview</a>.

```vue
<template>
  <div id="app">
    <md-field title="投保人" class="block">
      <md-input-item
        title="投保人姓名"
        placeholder="请填写投保人姓名"
      ></md-input-item>
      <md-input-item
        title="身份证号"
        placeholder="请填写投保人身份证号"
      ></md-input-item>
    </md-field>
    <md-field title="被保人" class="block">
      <md-input-item
        title="被保人姓名"
        placeholder="请填写被保人姓名"
      ></md-input-item>
      <md-field-item
        title="与投保人关系"
        arrow="arrow-right"
        :value="relation"
        @click="isPickerShow = true"
        solid
      ></md-field-item>
      <md-picker
        v-model="isPickerShow"
        :data="pickerData"
        title="选择与投保人关系"
      ></md-picker>
      <md-input-item
        title="身份证号"
        placeholder="请填写被保人身份证号"
      ></md-input-item>
      <md-input-item
        title="手机号"
        type="phone"
        placeholder="请填写被保人手机号"
      ></md-input-item>
    </md-field>
    <md-agree class="agree">
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
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
      relation: '本人',
      isPickerShow: false,
      actionBarData: [{
        text: '我要投保'
      }],
      pickerData: [[{text:'本人'},{text:'父母'},{text:'配偶'},{text:'子女'}]]
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body{
  background: #f0f0f0;
}
.detail{
  background: #fff;
  font-size: .24rem;
}
.block{
  margin-top: .32rem;
}
.agree{
  padding: .32rem;
  font-size: .24rem;
  color: #666;
}
</style>
```

