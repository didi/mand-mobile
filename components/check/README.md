---
title: Check 复选项
preview: https://didi.github.io/mand-mobile/examples/#/check
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
|name|唯一键值|any|`true`|当选中时，双向绑定的值|
|v-model|选中的值|any|`false`|-|
|label|选项文案|String|-|-|
|disabled|是否禁用选择|Boolean|`false`|-|
|icon|选中项图标名称|String|`checked`|-|
|icon-inverse|未选中项图标名称|String|`checke`|-|
|icon-disabled|禁用项选择图标名称|String|`check-disabled`|-|
|icon-svg<sup class="version-after">2.3.0+</sup>|使用svg图标|Boolean|`false`|-|
|size|图标大小|String|`md`|-|

---

#### CheckBox Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|name|唯一键值|any|`true`|当选中时，双向绑定的值|
|v-model|选中的值|any|`false`|-|
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
|icon<sup class="version-after">2.3.0+</sup>|选中项的图标|String|`checked`|-|
|icon-inverse<sup class="version-after">2.3.0+</sup>|非选中项的图标|String|`check`|-|
|icon-disabled<sup class="version-after">2.3.0+</sup>|禁用项的图标|String|`check-disabled`|-|
|icon-size<sup class="version-after">2.3.0+</sup>|图标大小|String|`md`|-|
|icon-svg<sup class="version-after">2.3.0+</sup>|使用svg图标|Boolean|`false`|-|
|icon-position<sup class="version-after">2.3.0+</sup>|图标位置|String|`right`|`left`, `right`|
|is-slot-scope|是否强制使用或不使用`slot-scope`|Boolean|-|某些情况下需要根据业务逻辑动态确定是否使用，可避免直接组件上加`if/else`|

#### CheckList Slots
```html
<template>
  <md-check-list :options="data">
    <template slot-scope="{ option, index, selected }">
      <div class="custom-title" v-text="option.text"></div>
      <div class="custom-brief">{{ option.text }}的自定义描述</div>
    </template>
  </md-check-list>
</template>
```
