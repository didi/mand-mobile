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
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|`value` of the selected item|String|-|If there is no `value` property in the data source, it is `text` or `label`|
|options|option data source|Array<{text, value, disabled, ...}>|`[]`|`disabled` is to disable option or not|
|default-index|the index of default selection|Number|`-1`|invalid when `v-model` has initial value|
|invalid-index|the index of disabled selection|Number/Array|`-1`|same to the attribute `disabled` in the `options` element|
|has-input-option|has editable item or not|Boolean|`false`|-|
|input-option-label|name of editable item|String|-|only when `has-input-option` is true|
|input-option-placeholder|placeholder of editable item|String|-|only when `has-input-option` is true|
|icon|icon of selected option|String|`right`|-|
|icon-inverse|icon of unselected options|String|-|-|
|icon-size|the size of icon|String|`sm`|-|
|icon-position|the position of icon|String|`right`|`left`, `right`|
|option-render|return customized rendering content for each option|Function({text, value, disabled, ...}): String|-|`vue 2.1.0+` can use `slot-scope`, see #Appendix|
|is-slot-scope|if it is mandatory to use `slot-scope`|Boolean|-|it depends on exact cases to determine whether to use it or not|
|is-across-border<sup class="version-after">1.5.0+</sup>|border through option item, no gap on both sides|Boolean|false|-|

#### Radio Methods

##### getSelectedValue(): option
Get data of selected option

Returns

|Props | Description | Type|
|----|-----|------|
|option|data of selected option|`Object:{text, value, disabled, ...}`，if selected option is editable, the type is `String`|

##### getSelectedIndex(): index
Get index of selected option

Returns

|Props | Description | Type|
|----|-----|------|
|index|index of selected option|Number|

##### selectByIndex(index)
Set a option as selected

|Parameters | Description | Type|
|----|-----|------|
|index|index of selected option|Number|

#### Component Events

##### @change(option, index)
Selected option changed

|Props | Description | Type|
|----|-----|------|
|option|data of selected option|`Object:{text, value, disabled, ...}`，if selected option is editable, the type is `String`|
|index|index of selected option|Number|

#### Appendix

```html
<template>
  <md-radio
    :options="data"
  >
    <!-- 'option' is the data of each option -->
    <template slot-scope="{ option }">
      <div class="md-radio-custom-title" v-text="option.text"></div>
      <div class="md-radio-custom-brief">{{ option.text }} Custom Description</div>
    </template>
  </md-radio>
</template>
```
