---
title: Quickstart
---

#### Scaffold

**New project** can be initialized and integrated with `mand-mobile` by [vue-cli](https://github.com/vuejs/vue-cli). Please refer to <a href="javascript:jumpAnchor('Installation')">Installation</a> for **existing projects**.

* Vue CLI 2/3([Template](https://github.com/mand-mobile/mand-mobile-template))(sp 1.x)

```shell
vue init mand-mobile/mand-mobile-template my-mand-mobile-project
```

* Vue CLI 3([Plugin](https://github.com/mand-mobile/vue-cli-plugin-mand))(sp 1.x/2.x)

```shell
vue create my-project
cd my-project
npm install --save-dev vue-cli-plugin-mand
vue invoke mand
```

* Vue CLI 3([Example](https://github.com/mand-mobile/vue-cli3-example))(sp 1.x/2.x)

* Nuxt([Example](https://github.com/mand-mobile/nuxt-example))

#### Vue UI

Create and manage projects with a graphical interface via [Vue UI](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui) and integrate `mand-mobile` with the plugin [vue-cli-plugin-mand](https://www.npmjs.com/package/vue-cli-plugin-mand)

* Start `Vue UI`

```shell
vue ui
```

* Once the project is created, click on the **Plugins** and search for `mand-mobile`, click on the search result to complete the installation

<img src="https://pt-starimg.didistatic.com/static/starimg/img/3zEzXVU28N1565160574175.png"/>

#### Installation

##### **NPM or Yarn**

```shell
npm install mand-mobile --save
# OR 
yarn add mand-mobile
```

##### **Import in Browser**

Add `script` and `link` tags in your browser and use the global variable `window['mand-mobile']`.

The `JS` and `CSS` bundles are provided in the `mand-mobile/lib` or `mand-mobile/lib-vw` directory of the `npm` distribution. See <a href="javascript:jumpAnchor('Release Package Directory')">Release Package Directory</a>.    

You can also download it via [![](https://data.jsdelivr.com/v1/package/npm/mand-mobile/badge)](https://www.jsdelivr.com/package/npm/mand-mobile) or [UNPKG](https://unpkg.com/mand-mobile/lib/).

> It is recommended that users who are directly introduced with the CDN lock the version to avoid incompatibility updates. Please refer to [unpkg.com](unpkg.com) for more information.

#### Import

##### On-demand Loading(Recommended)

> Use <a href="https://github.com/ant-design/babel-plugin-import" target="_blank">babel-plugin-import</a>
  or
  <a href="https://github.com/Brooooooklyn/ts-import-plugin" target="_blank">ts-import-plugin</a>. No need to configure style path and default directory is 'lib', other directory reference <a href="javascript:jumpAnchor('Release Package Directory')">Release Package Directory</a>

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

> If there is no configuration above, it will be imported in full amount, all styles need to be manually imported, and reference<a href="javascript:jumpAnchor('Totally Import')">Totally Import</a>

```javascript
import { Button } from 'mand-mobile'
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

##### Normalize or Reset

To make browsers render all elements more consistently and in line with modern standards，[Normalize.css](http://necolas.github.io/normalize.css/) or [Reset CSS](https://meyerweb.com/eric/tools/css/reset/) is recommended to import.

##### FastClick

To avoid click problems caused by [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile), [FastClick](https://github.com/ftlabs/fastclick) is recommended to import.

```javascript
import FastClick from 'fastclick'

if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement) {
    targetElement.focus()
  }
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
```

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
      minPixelValue: 2,
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
  minPixelValue: 2,
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
          minPixelValue: 2,
          propWhiteList: []
        }))
      ]
    }
  }
}))
```

> [How to make the configuration only work on `mand-mobile`?](https://github.com/didi/mand-mobile/issues/103)


#### Customization

* [Customize Theme](#/en-US/docs/theme)
* [Local Iconfont](#/en-US/docs/components/basic/icon?anchor=Importing%20local%20font%20files)

#### Usage

This is a form page developed by `Mand Mobile`

<iframe src="https://codesandbox.io/embed/vue-template-ckqbz?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue" title="Mand Mobile Quick Start" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:1000px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

