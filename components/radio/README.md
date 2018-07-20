---
title: Radio 单选框
preview: https://didi.github.io/mand-mobile/examples/#/radio
---

可自定义或编辑单选框

### 引入

```javascript
import { Radio } from 'mand-mobile'

Vue.component(Radio.name, Radio)
```

### 代码演示
<!-- DEMO -->

### API

#### Radio Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|选中项的`value`|String|-|如果数据源中没有`value`, 则为`text`或`label`|
|options|选项数据源|Array<{text, value, disabled, ...}>|`[]`|`disabled`为选项是否禁用|
|default-index|默认选择项索引|Number|`-1`|`v-model`有初始值时无效|
|invalid-index|禁用选择项索引|Number/Array|`-1`|作用等同于`options`元素中的属性`disabled`|
|has-input-option|是否具有可编辑项|Boolean|`false`|-|
|input-option-label|可编辑项的名称|String|-|仅用于`has-input-option`为`true`|
|input-option-placeholder|可编辑项的占位提示|String|-|仅用于`has-input-option`为`true`|
|icon|选中项的图标|String|`right`|-|
|icon-inverse|非选中项的图标|String|-|-|
|icon-size|图标大小|String|`sm`|-|
|icon-position|图标位置|String|`right`|`left`, `right`|
|option-render|返回各选项自定义渲染内容|Function({text, value, disabled, ...}): String|-|`vue 2.1.0+`可使用`slot-scope`，见附录|
|is-slot-scope|是否强制使用或不使用`slot-scope`|Boolean|-|某些情况下需要根据业务逻辑动态确定是否使用|
|is-across-border<sup class="version-after">1.5.0+</sup>|边框通栏，两侧无间距|Boolean|false|-|

#### Radio Methods

##### getSelectedValue(): option
获取当前选中项

返回

|属性 | 说明 | 类型|
|----|-----|------|
|option|选中项的数据|`Object:{text, value, disabled, ...}`，如果选中为可编辑项，则为`String`|

##### getSelectedIndex(): index
获取当前选中项索引值

返回

|属性 | 说明 | 类型|
|----|-----|------|
|index|选中项索引值|Number|

##### selectByIndex(index)
设置选中项

|参数 | 说明 | 类型|
|----|-----|------|
|index|选中项索引值|Number|

#### Component Events

##### @change(option, index)
切换选中项事件

|属性 | 说明 | 类型|
|----|-----|------|
|option|选中项的数据|`Object:{text, value, disabled, ...}`，如果选中为可编辑项，则为`String`|
|index|选中项索引值|Number|

#### 附录

```html
<template>
  <md-radio
    :options="data"
  >
    <!-- option 为每个选项的数据 -->
    <template slot-scope="{ option }">
      <div class="md-radio-custom-title" v-text="option.text"></div>
      <div class="md-radio-custom-brief">{{ option.text }}的自定义描述</div>
    </template>
  </md-radio>
</template>
```
