---
title: TabPicker
preview: https://didi.github.io/mand-mobile/examples/#/tab-picker
---

The tab panel supports cascade or non-cascaded selection of the bottom of page

### Import

```javascript
import { TabPicker } from 'mand-mobile'

Vue.component(TabPicker.name, TabPicker)
```

### user guidance

The title of the tab panel supports custom rendering (via slot-scope)
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
Asynchronous cascading panel supports incoming slots
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
|v-model|tabpicker show or hide|Boolean|`false`|-|
|data|data source|Array|`[]`|data format reference `Appendix`|
|data-struct|data cascaded type|String|`noCascade`|`normal`, `cascade`, `async`|
|default-index|initial selected option index of each column|Array|`[]`|-|
|option-render|return option rendering content|Array<Function({text, disabled, ...}):String>|`[]`|`vue 2.1.0+` surpports `slot-scope`，reference `Appendix`|
|async-func|acquiring data function asynchronously|Function(value, callBack)|-|-|
|title|title of tabpicker|String|-|-|
|ok-text|text of confirmation button|String|`confirm`|-|
|cancel-text|text of cancellation button|String|`cancel`|-|
|mask-closable|click on the mask to close the tabpicker|Boolean|`true`|-|

#### TabPicker Methods

##### getSelectedItem()
Get the value of all column selections

Returns

|Props | Description | Type|
|----|-----|------|
|columnsValue|the value of all column selections|Array<{value, lable, ...}>|

#### TabPicker Events

##### @change(select)
TabPicker has been changed the selection of some column

|Parameters | Description | Type|
|----|-----|------|
|select|the value of change selections|Object: {value,lable, ...}|

##### @confirm(columnsValue)
TabPicker has been clicked confirmation button

|Parameters | Description | Type|
|----|-----|------|
|columnsValue|the value of all column selections|Array<{value, lable, ...}>|

##### @cancel()
TabPicker has been clicked cancellation button

##### @show()
TabPicker has been displayed

##### @hide()
TabPicker has been hidden

### Appendix

* Non-cascade data source data format

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

* Cascade data source data format

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

* Custom rendering option

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
