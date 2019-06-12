---
title: 快速上手
---

#### 脚手架

**新项目**可通过[vue-cli](https://github.com/vuejs/vue-cli)初始化集成`mand-mobile`，**现有项目**集成请参考<a href="javascript:jumpAnchor('安装')">安装</a>

* Vue CLI 2/3([模板](https://github.com/mand-mobile/mand-mobile-template))(支持1.x)

```shell
vue init mand-mobile/mand-mobile-template my-mand-mobile-project
```

* Vue CLI 3([插件](https://github.com/mand-mobile/vue-cli-plugin-mand))(支持1.x/2.x)

```shell
vue create my-project
cd my-project
npm install --save-dev vue-cli-plugin-mand
vue invoke mand
```

* Vue CLI 3([示例](https://github.com/mand-mobile/vue-cli3-example))(支持1.x/2.x)

* Nuxt([示例](https://github.com/mand-mobile/nuxt-example))

#### 安装

##### **NPM or Yarn**

```shell
npm install mand-mobile --save
# OR 
yarn add mand-mobile
```

##### **浏览器引入**

在浏览器中使用`script`和`link`标签直接引入文件，并使用全局变量 `window['mand-mobile']`

在`npm`发布包内的`mand-mobile/lib`或`mand-mobile/lib-vw`目录下提供了`JS`以及`CSS` bundle，参考<a href="javascript:jumpAnchor('产出包目录')">产出包目录</a>。   

你也可以通过[![](https://data.jsdelivr.com/v1/package/npm/mand-mobile/badge)](https://www.jsdelivr.com/package/npm/mand-mobile)或者[UNPKG](https://unpkg.com/mand-mobile/lib/)进行下载。

#### 引入

##### 按需加载(推荐)

> 使用 <a href="https://github.com/ant-design/babel-plugin-import" target="_blank">babel-plugin-import</a>
  或
  <a href="https://github.com/Brooooooklyn/ts-import-plugin" target="_blank">ts-import-plugin</a>, 无需配置style，默认加载目录为lib，其他目录参考<a href="javascript:jumpAnchor('产出包目录')">产出包目录</a>

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

组件使用：

> 如果没有以上配置，会全量引入，需手动引入全部样式， 参考<a href="javascript:jumpAnchor('全量引入')">全量引入</a>

```javascript
import { Button } from 'mand-mobile'
```

##### 按需引入

```javascript
import Button from 'mand-mobile/lib/button'
```

##### 全量引入

```javascript
import Vue from 'vue'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

Vue.use(mandMobile)
```

#### 使用前准备

##### Normalize

为标准化浏览器元素的样式，推荐引入[Normalize.css](http://necolas.github.io/normalize.css/)

##### FastClick

为避免[浏览器兼容问题](https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile)引起的点击问题, 推荐引入[FastClick](https://github.com/ftlabs/fastclick)

##### 产出包目录

[产出包](https://unpkg.com/mand-mobile/)中包含以下几种不同目录，分别适用于不同场景的代码，可根据实际需要选择一个目录加载：

```
├── mand-mobile
    ├── components  # 源码，一般自定义主题等
    ├── lib         # 编译后，样式单位px，一般用于自定义适配方案等（默认）
    ├── lib-vw      # 编译后，样式单位vh/vw，一般用于非兼容场景，无需额外配置
    ├── ...
```

##### `Px` to `Rem`

产出包`lib`目录中的组件样式以`px`为单位，并且以`iPhone6`屏幕 “物理像素” 宽度`750`为基准 (即普通 “逻辑像素” 值的`2`倍大小)。在实际项目中，可根据具体情况使用`postcss-pxtorem`把`px`单位转成`rem`，从而实现不同设备下等比缩放的效果。

如转换基准为`1rem = 100px`：

* `.postcssrc.js`配置

```javascript
module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 100,
      minPixelValue: 2,
      propWhiteList: []
    })
  ]
}
```

* `webpack`配置

```javascript
const pxtorem = require('postcss-pxtorem');

// Postcss
webpackConfig.postcss.push(pxtorem({
  rootValue: 100,
  minPixelValue: 2,
  propWhiteList: []
}))

// Poststylus（使用源码时）
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

#### 配置主题和字体

* [改变主题](#/zh-CN/docs/theme)
* [使用本地字体](#/zh-CN/docs/components/basic/icon?anchor=引入本地字体文件)

#### 使用

这是一个使用`Mand Mobile`组件开发而成的表单页面

<iframe src="https://codesandbox.io/embed/vue-template-ckqbz?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue" title="Mand Mobile Quick Start" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:1000px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
