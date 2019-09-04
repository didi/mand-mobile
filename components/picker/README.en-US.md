---
title: Picker
preview: https://didi.github.io/mand-mobile/examples/#/picker
---

Scrollable multi-column selector

### Import

```javascript
import { Picker } from 'mand-mobile'

Vue.component(Picker.name, Picker)
```

### Code Examples
<!-- DEMO -->

### API

#### Picker Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|display picker or not|Boolean|`false`|-|
|data|data source|Array<{value, label, ...}>[]|`[]`|-|
|cols|number of columns|Number|`1`|-|
|default-index|indexes of initially selected items in each column|Array|`[]`|-|
|default-value|values of initially selected items in each column|Array|`[]`|Available key `text/label/value`|
|invalid-index|indexes of disabled items in each column|Array|`[]`|array of multiple disabled items, such as `[[1,2], 2]`|
|is-view|inline display in page, otherwise it shows as `Popup`|Boolean|`false`|-|
|is-cascade|data in each column is cascaded or not|Boolean|`false`|see #Appendix for the format of cascaded data|
|line-height|line height of options|Number|`45`|unit `px`|
|title|title of picker|String|-|-|
|describe|description of picker|String|-|-|
|ok-text|confirmation text|String|`confirm`|-|
|cancel-text|cancellation text|String|`cancel`|-|
|large-radius <sup class="version-after">2.4.0+</sup>|large radius of title bar|Boolean|`false`|-|
|mask-closable|picker will be closed when clicking mask|Boolean|`true`|-|

#### Picker Methods

##### refresh(callback, startColumnIndex)
Reinitialized picker, like updating `data`、`default-index`、`invalid-index` or call `setColumnValues`，it can also be replaced with [key](https://vuejs.org/v2/api/#key)

|Parameters | Description | Type|
|----|-----|------|
|callback|initialization completes callback|Function|
|startColumnIndex|the starting index of the column to reset, default value is 0|Function|

##### getColumnValue(index): activeItemValue
Get the data of the currently selected item in a column, need to be called after the `initialed` event is invoked or asynchronously called

|Parameters | Description | Type|
|----|-----|------|
|index|the index of each column|Number|

Returns

|Props | Description | Type|
|----|-----|------|
|activeItemValue|value of selected item|Object: {value, label, ...}|

##### getColumnValues(): columnsValue
Get values of all selected columns, need to be called after the `initialed` event is invoked or asynchronously called

Returns

|Props | Description | Type|
|----|-----|------|
|columnsValue|values of all selected columns|Array<{value, label, ...}>|

##### getColumnIndex(index): activeItemIndex
Get the index of the currently selected item in the column, need to be called after the `initialed` event is invoked or asynchronously called

|Parameters | Description | Type|
|----|-----|------|
|index|the index of column|Number|

Returns

|Props | Description | Type|
|----|-----|------|
|activeItemIndex|the index of selected item|Number|

##### getColumnIndexs(): columnsIndex
Get indexes of all selected columns, need to be called after the `initialed` event is invoked or asynchronously called

Returns

|Props | Description | Type|
|----|-----|------|
|columnsIndex|indexes of all selected columns|Array|

##### setColumnValues(index, values, callback)
Set column data

|Parameters | Description | Type|
|----|-----|------|
|index|the index of each column|Number|
|values|data of each column|Array<{value, label, ...}>|
|callback|callback is completed after setting `values`|Function|

#### Picker Events

##### @initialed()
Initialize picker, callable functions are `getColumnIndex`, `getColumnIndexs`, `getColumnValue`, `getColumnValues`

##### @change(columnIndex, itemIndex, value)
Change pickers' selections

|Parameters | Description | Type|
|----|-----|------|
|columnIndex|the index of changed column|Number|
|itemIndex|the index of changed item in the column|Number|
|value|the value of changed item in the column|Object: {value, label, ...}|

##### @confirm(columnsValue)
Confirm picker's selection (only when `is-view` is `false`）

|Parameters | Description | Type|
|----|-----|------|
|columnsValue|values of all selected columns|Array<{value, label, ...}>|

##### @cancel()
Cancel picker's selection (only when `is-view` is `false`）

##### @show()
Show picker (only when `is-view` is `false`）

##### @hide()
Hide picker (only when `is-view` is `false`）

### Appendix

* The format of non-cascade data source

```javascript
[
  [
    {
      // Option display text
      "text": "",
      // custom fields
      "value": ""
    },
    // ...
  ],
  // ...
]
```

* The format of cascaded data source

```javascript
[
  [
    {
      // ption display text
      "text": "",
      // data of second column
      "children": [
        {
          "text": "",
          // data of third column
          "children": [
            // ...
          ]
        },
        // ...
      ]
      // custom fields
      "value": ""
    },
    // ...
  ]
]
```
