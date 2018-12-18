---
title: Switch 开关
preview: https://mand-mobile.github.io/2x-doc/examples/#/switch
---

开关按钮，用于表示开关状态/两种状态之间的切换

### 引入

```javascript
import { Switch } from 'mand-mobile'

Vue.component(Switch.name, Switch)
```

### 代码演示
<!-- DEMO -->

### API

#### Switch Props
|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|v-model|打开或者关闭|Boolean|`false`|
|disabled|是否禁用|Boolean|`false`|

#### Switch Events

##### @change(isActive)
事件说明

|属性 | 说明 | 类型 |
|----|-----|------|
|isActive|开关状态，打开或者关闭|Boolean|
