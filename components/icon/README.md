---
title: Icon 图标
preview: https://didi.github.io/mand-mobile/examples/#/icon
---

IconFont、SVG 图标

### 引入

```javascript
import { Icon } from 'mand-mobile'

Vue.component(Icon.name, Icon)
```

### 使用指南

自定义svg图标和引入本地字体文件，请参考<a href="javascript:jumpAnchor('附录')">附录</a>。

### 代码演示
<!-- DEMO -->

### API

#### Icon Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|name|图标名称|String|-|-|
|size|图标大小|String|`md`|`xs`, `sm`, `md`, `lg`|
|color|图标颜色|String|`currentColor`|-|
|svg|使用svg图标|Boolean|`false`|-|

### 附录

#### 自定义svg图标

自定义svg图标需使用<a href="https://github.com/kisenka/svg-sprite-loader" target="_blank">svg-sprite-loader</a>，svg文件名即图标名称

1. 安装依赖

```shell
npm install svg-sprite-loader --save-dev
```

2. webpack配置

```javascript
const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.svg$/i,
        loader: 'svg-sprite-loader',
        include: [
          // 将某个路径下所有svg交给 svg-sprite-loader 插件处理
          path.resolve(__dirname, 'src/my-project-svg-folder')
        ],
      }
    ]
  }
}
```
3. 引入图标

```vue
<template>
  <div>
    <md-icon name="hello" svg></md-icon>
    <md-icon name="world" svg></md-icon>
  </div>
</template>

<script>
import 'src/my-project-svg-folder/hello.svg'
import 'src/my-project-svg-folder/world.svg'
import { Icon } from 'mand-mobile'

export default {
  name: 'icon-demo',
  components: {
    [Icon.name]: Icon
  }
}
</script>
```

#### 引入本地字体文件

> 注意：webpack配置[url-loader](https://github.com/webpack-contrib/url-loader)需要包含mand-mobile 

* 重置css中的图标字体  

```css
@font-face{
  font-family: Mand-Mobile-Icon;
  font-style: normal;
  font-weight: 400;
  src: url(~mand-mobile/components/icon/iconfont.woff) format("woff"),url(~mand-mobile/components/icon/iconfont.woff) format("truetype")
}
``` 

* 自定义主题时重置stylus变量

```
icon-font-family = url("./iconfont.woff") format("woff"), url("./iconfont.ttf") format("truetype")
```