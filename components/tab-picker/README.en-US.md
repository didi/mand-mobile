---
title: TabPicker
preview: https://didi.github.io/mand-mobile/examples/#/tab-picker
---

Support cascaded or non-cascaded selections in the footer

### Import

```javascript
import { TabPicker } from 'mand-mobile'

Vue.component(TabPicker.name, TabPicker)
```
### Instruction

The title of the tab panel supports customized rendering (via slot-scope)

```html
  <!-- props is data for each tab tag -->
  <div
      slot="titles"
      slot-scope="props"
      class="title-item">
      Html tags
      {{ props.label }}
    </div>
```

Asynchronous cascading panel supports passing slots

```html
  <!--Acquiring data asynchronously loading slot-->
  <div slot="loading">loading tag</div>

  <!--Acquiring data asynchronously error slot -->
  <div slot="error">error tips</div>
```

### Code Examples
<!-- DEMO -->

### API

#### TabPicker Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|whether to show tabpicker or not|Boolean|`false`|-|
|data|data source|Array|`[]`|refer to `Appendix` for data format|
|data-struct|the type of cascaded data|String|`noCascade`|`normal`, `cascade`, `async`|
|default-index|the index of initially selected item|Array|`[]`|-|
|option-render|return rendering contents of each option|Array<Function({text, disabled, ...}):String>|`[]`|`vue 2.1.0+` surpports `slot-scope`，see `Appendix`|
|async-func|acquire data asynchronously|Function(value, callBack)|-|-|
|title|the title of tabpicker|String|-|-|
|ok-text|text of confirmation button|String|`confirm`|-|
|cancel-text|text of cancellation button|String|`cancel`|-|
|placeholder<sup class="version-after">1.6.3+</sup>|select placeholder|String|`Select`|-|
|errorLabel<sup class="version-after">1.6.3+</sup>|text for invalid data source|String|`Data Error`|-|
|loadingLabel<sup class="version-after">1.6.3+</sup>|text for loading state|String|`Loading`|-|
|mask-closable<sup class="version-after">1.3.0+</sup>|if the popup will be closed when clicking on the mask|Boolean|`true`|-|

#### TabPicker Methods

##### getSelectedItem()
Get all values of selected items in the column

Returns

|Props | Description | Type|
|----|-----|------|
|columnsValue|values of selected items in the column|Array<{value, lable, ...}>|

#### TabPicker Events

##### @change(select)
Change selections of columns in the tabpicker

|Parameters | Description | Type|
|----|-----|------|
|select|the value of change selections|Object: {value,lable, ...}|

##### @confirm(columnsValue)
Confirm selections in the tabpicker

|Parameters | Description | Type|
|----|-----|------|
|columnsValue|the value of all column selections|Array<{value, lable, ...}>|

##### @cancel()
Cancel selections in the tabpicker

##### @show()
Show tabPicker

##### @hide()
Hide tabPicker

### Appendix

* Data format of non-cascaded data source

```javascript
[
  {
    // option label
    "label": "",
    // option value
    "value": "",
    // the children of option
    "children": [
      {
        "label": "",
        "value": ""
      },
      // ...
    ]
  },
  // ...
  // ...
]
```

* Data format of cascaded data source

```javascript
[
  {
    // option label
    "label": "",
    // option value
    "value": "",
    // the children of option
    "children": [
      {
        "label": "",
        "value": "",
        "children": [
          //...
        ]
      }
    ]
  },
  //...
]
```

* Asynchronous cascade data source data format

```javascript
[
  {
    // option label
    "label": "",
    // option value
    "value": "",
    // the children of option
    "children": [
      {
        "label": "",
        "value": "",
        "children": [
          //...
        ]
      }
    ]
  },
  //...
]
```

* Customized rendering option

```html
<template>
  <md-tab-picker
    :data="data"
  >
    <!-- option is data for each option -->
    <li
      slot="option"
      slot-scope="props"
      class="option-item">
      public html tag
      <div v-if="props.index === 0" >
        the first {{ props.index }} column html tag {{ props.option.label }}
      </div>
      <div v-else-if="props.index === 1">
        the second {{ props.index }} column html tag  {{ props.option.label }}
      </div>
      <div v-else>
        the third {{ props.index }} column html tag {{ props.option.label }}
      </div>
    </li>
  </md-tab-picker>
</template>
```
