---
title: Check 复选项
preview: https://mand-mobile.github.io/2x-doc/examples/#/check
---

### 引入

```javascript
import { Check, CheckBox, CheckGroup, CheckList } from 'mand-mobile'

Vue.component(Check.name, Check)
Vue.component(CheckBox.name, CheckBox)
Vue.component(CheckGroup.name, CheckGroup)
Vue.component(CheckList.name, CheckList)
```

### 代码演示
<!-- DEMO -->

### API

#### Check Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|name|唯一键值|Boolean/String|`true`|当选中时，双向绑定的值|
|v-model|选中的值|Boolean/String|`false`|-|
|disabled|是否禁用选择|Boolean|`false`|-|

---

#### CheckBox Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|name|唯一键值|Boolean/String|`true`|当选中时，双向绑定的值|
|v-model|选中的值|Boolean/String|`false`|-|
|disabled|是否禁用选择|Boolean|`false`|-|

---

#### CheckGroup Props
复选组，用以选中多个复选项。与`Check`或`CheckBox`组合使用。

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|选中的值|Array|-|-|
|max|最多选择几个|Number|`0`|0为不限制|

#### CheckGroup Methods

##### check(name)

|参数 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|name|需要选中的键值|String|-|

##### uncheck(name)

|参数 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|name|需要去掉的键值|String|-|

##### toggle(name)

|参数 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|name|需要反选的键值|String|-|

---

#### CheckList Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|选中项的`value`|Array|-|-|
|options|选项数据源|Array<{text, value, disabled, ...}>|`[]`|`disabled`为选项是否禁用|
|is-slot-scope|是否强制使用或不使用`slot-scope`|Boolean|-|某些情况下需要根据业务逻辑动态确定是否使用，可避免直接组件上加`if/else`|

#### CheckList Slots
```html
<template>
  <md-check-list :options="data">
    <template slot-scope="{ option }">
      <div class="custom-title" v-text="option.text"></div>
      <div class="custom-brief">{{ option.text }}的自定义描述</div>
    </template>
  </md-check-list>
</template>
```
