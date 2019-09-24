---
title: Radio
preview: https://didi.github.io/mand-mobile/examples/#/radio
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
|v-model|selected `name`|any|-|
|name|unique name|any|-|-|
|label|description text|String-|-|
|disabled|whether disable option|Boolean|`false`|-|
|inline|whether display as inline block|Boolean|`false`|-|
|icon|selected icon name|String|`checked`|-|
|icon-inverse|icon name|String|`check`|-|
|icon-disabled|icon of disabled options|String|`check-disabled`|-|
|icon-svg|use svg icon|Boolean|`false`|-|
|size|size of icon|String|`md`|-|

---


#### RadioBox Props
Radio box <sup class="version-after">2.5.0+</sup>
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|unique name|any|`true`|-|
|v-model|selected name|any|`false`|-|
|disabled|whether disable selection or not|Boolean|`false`|-|

---

#### RadioGroup Props
Check multiple radios. Combine with `Radio` or `RadioBox` <sup class="version-after">2.5.0+</sup>

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|v-model|selected names|Array|-|-|
|max|max selected name length|Number|`0`|`0`: no limit|

#### RadioGroup Methods

##### check(name)

| Arg | Description | Type | Default |
|----|-----|------|------|
|name|name will be selected|String|-|

---

#### Radio List Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|`value` of the selected item|any|-|-|
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

##### @change(option, index)
Selected option changed

|Props | Description | Type |
|----|-----|------|
|option|data of selected option|Object:{text, value, disabled, ...}|
|index|index of selected option|Number|

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
