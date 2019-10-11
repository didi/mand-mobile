---
title: Radio 单选框
preview: https://didi.github.io/mand-mobile/examples/#/radio
---

可自定义或编辑单选框

### 引入

```javascript
import { Radio, RadioBox, RadioGroup, RadioList } from 'mand-mobile'

Vue.component(Radio.name, Radio)
Vue.component(RadioBox.name, RadioBox)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioList.name, RadioList)
```

### 代码演示
<!-- DEMO -->

### API

#### Radio Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|选中项的`name`|any|-|
|name|唯一键值|any|-|-|
|label|描述文案|String-|-|
|disabled|是否禁用选项|Boolean|`false`|-|
|inline|是否内联显示|Boolean|`false`|-|
|icon|选中项的图标|String|`checked`|-|
|icon-inverse|非选中项的图标|String|`check`|-|
|icon-disabled|禁用项的图标|String|`check-disabled`|-|
|icon-svg|使用svg图标|Boolean|`false`|-|
|size|图标大小|String|`md`|-|

---

#### RadioBox Props
单选框 <sup class="version-after">2.5.0+</sup>

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|name|唯一键值|any|`true`|当选中时，双向绑定的值|
|v-model|选中的值|any|`false`|-|
|disabled|是否禁用选择|Boolean|`false`|-|

---

#### RadioGroup Props
单选组，用以选中多个单选项。与`Radio`或`RadioBox`组合使用 <sup class="version-after">2.5.0+</sup>

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|选中的值|Array|-|-|
|max|最多选择几个|Number|`0`|0为不限制|

#### RadioGroup Methods

##### check(name)

|参数 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|name|需要选中的键值|String|-|

---

#### Radio List Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|选中项的`value`|any|-|
|options|选项数据源|Array<{text, value, disabled, ...}>|`[]`|`disabled`为选项是否禁用|
|has-input|是否具有可编辑项|Boolean|`false`|-|
|input-label|可编辑项的名称|String|-|仅用于`has-input`为`true`|
|input-placeholder|可编辑项的占位提示|String|-|仅用于`has-input`为`true`|
|icon|选中项的图标|String|`checked`|-|
|icon-inverse|非选中项的图标|String|`check`|-|
|icon-disabled|禁用项的图标|String|`check-disabled`|-|
|icon-size|图标大小|String|`lg`|-|
|icon-svg|使用svg图标|Boolean|`false`|-|
|icon-position|图标位置|String|`left`|`left`, `right`|
|is-slot-scope|是否强制使用或不使用`slot-scope`|Boolean|-|某些情况下需要根据业务逻辑动态确定是否使用，可避免直接组件上加`if/else`|

#### Radio List Methods

##### select(value)
设置选中项

|参数 | 说明 | 类型|
|----|-----|------|
|value|选中项的value|String|

#### Radio List Events

##### @change(option, index)
切换选中项事件

|属性 | 说明 | 类型|
|----|-----|------|
|option|当前选中项的数据|Object:{text, value, disabled, ...}|
|index|当前选中项的索引|Number|

#### Radio List Slots
```html
<template>
  <md-radio-list :options="data">
    <template slot-scope="{ option, index, selected }">
      <div class="custom-title" v-text="option.text"></div>
      <div class="custom-brief">{{ option.text }}的自定义描述</div>
    </template>
  </md-radio-list>
</template>
```
