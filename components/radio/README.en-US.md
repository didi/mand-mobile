---
title: Radio
preview: https://mand-mobile.github.io/2x-doc/examples/#/radio
---

Customizable or editable radio buttons

### Import

```javascript
import { Radio } from 'mand-mobile'

Vue.component(Radio.name, Radio)
```

### Code Examples
<!-- DEMO -->

### API

#### Radio Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|selected `name`|String/Number|-|
|name|unique name|String/Number|-|-|
|label|description text|String-|-|
|disabled|whether disable option|Boolean|`false`|-|
|inline|whether display as inline block|Boolean|`false`|-|
|icon|selected icon name|String|`checked`|-|
|icon-inverse|icon name|String|`check`|-|
|icon-disabled|icon of disabled options|String|`check-disabled`|-|
|icon-svg|use svg icon|Boolean|`false`|-|
|size|size of icon|String|`md`|-|

---

#### Radio List Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|`value` of the selected item|String|-|-|
|options|option data source|Array<{text, value, disabled, ...}>|`[]`|`disabled` is to disable option or not|
|has-input|has editable item or not|Boolean|`false`|-|
|input-label|name of editable item|String|-|only when `has-input` is true|
|input-placeholder|placeholder of editable item|String|-|only when `has-input` is true|
|icon|icon of selected option|String|`checked`|-|
|icon-inverse|icon of unselected options|String|`check`|-|
|icon-disabled|icon of disabled options|String|`check-disabled`|-|
|icon-size|the size of icon|String|`lg`|-|
|icon-svg|use svg icon|Boolean|`false`|-|
|icon-position|the position of icon|String|`left`|`left`, `right`|
|is-slot-scope|if it is mandatory to use `slot-scope`|Boolean|-|it depends on exact cases to determine whether to use it or not, and avoids adding `if/else` to component|

#### Radio List Methods

##### select(value)
Set selected value

|Parameters | Description | Type |
|----|-----|------|
|value|value of option|String|

#### Radio List Events

##### @input(value)
Selected option changed

|Props | Description | Type |
|----|-----|------|
|value|value of selected option|`String`|

#### Radio List Slots
```html
<template>
  <md-radio-list :options="data">
    <template slot-scope="{ option }">
      <div class="custom-title" v-text="option.text"></div>
      <div class="custom-brief">{{ option.text }}的自定义描述</div>
    </template>
  </md-radio-list>
</template>
```
