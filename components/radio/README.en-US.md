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
|v-model|`value` of the selected option|String|-|If there is no `value` property in the data source, it is `text` or `label`|
|options|option data source|Array<{text, value, disabled, ...}>|`[]`|`disabled` is option disabled|
|default-index|default selection index|Number|`-1`|invalid when `v-model` has initial value|
|invalid-index|disabled selection index|Number/Array|`-1`|equal to the attribute `disabled` in the `options` element|
|has-input-option|has editable item|Boolean|`false`|-|
|input-option-label|name of editable item|String|-|only for `has-input-option`|
|input-option-placeholder|placeholder of editable item|String|-|only for `has-input-option`|
|icon|icon of selected option|String|`right`|-|
|icon-inverse|icon of unselected options|String|-|-|
|icon-size|icon size|String|`sm`|-|
|icon-position|icon position|String|`right`|`left`, `right`|
|option-render|return custom rendering content for each option|Function({text, value, disabled, ...}): String|-|`vue 2.1.0+` can use `slot-scope`, see #Appendix|
|is-slot-scope|mandatory use `slot-scope`|Boolean|-|it may be necessary to dynamically determine whether to use in some cases|

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
