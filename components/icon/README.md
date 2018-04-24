---
title: Icon 图标
preview: https://didi.github.io/mand-mobile/examples/#/icon
---

SVG 图标

### 引入

```javascript
import { Icon } from 'mand-mobile'

Vue.component(Icon.name, Icon)
```

### 使用指南

组件库内置图标可直接使用，`arrow-up/down/left/right`, `circle-alert/cross/right`，`hollo-plus`，`cross`，`spinner`

其他自定义图标需使用<a href="https://github.com/kisenka/svg-sprite-loader" target="_blank">svg-sprite-loader</a>，svg文件名即图标名称

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
    <md-icon name="hello"></md-icon>
    <md-icon name="world"></md-icon>
  </div>
</template>

<script>
import 'src/my-project-svg-folder/hello.svg'
import 'src/my-project-svg-folder/world.svg'
import { Icon } from 'mand-mobile'

export default {
  name: 'icon-demo',
  component: {
    [Icon.name]: Icon
  }
}
</script>
```

### 代码演示
<!-- DEMO -->

### API

#### Icon Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|name|图标名称|String|-|-|
|size|图标大小|String|`md`|`xs`, `sm`, `md`, `lg`|
|color|图标颜色|String|`currentColor`|该颜色值会作为`fill`的值被设置在`svg`图标上|
