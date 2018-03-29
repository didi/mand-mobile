---
title: Landscape 输入框
preview: https://didi.github.io/mand-mobile/examples/#/landscape
---

用于在浮层中显示广告或说明

### 引入

```javascript
import { Landscape } from 'mand-landscape'

Vue.component(Landscape.name, Landscape)
```

### 代码演示
<!-- DEMO -->

### API

#### Landscape Props
|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|v-model|是否展示|Boolean|`false`|
|has-mask|是否有蒙层|Boolean|`true`|
|scroll|内容区域是否可以滚动|Boolean|`false`|

#### Landscape Events

##### @show()
弹出层展示事件

##### @hide()
弹出层隐藏事件
