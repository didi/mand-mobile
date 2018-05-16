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
|v-model|picker display|Boolean|`false`|-|
|data|data source|Array<{value, lable, ...}>[]|`[]`|-|
|cols|number of columns|Number|`1`|-|
|default-index|initial selected option index of each column|Array|`[]`|-|
|invalid-index|disabled option index of each column|Array|`[]`|array for multiple disabled options, such as `[[1,2], 2]`|
|is-view|inline display in page, otherwise it is in `Popup`|Boolean|`false`|-|
|is-cascade|each column of data is cascaded|Boolean|`false`|cascade data format see #Appendix|
|title|title of picker|String|-|-|
|ok-text|text of confirmation|String|`确认`|-|
|cancel-text|text of cancellation|String|`取消`|-|

#### Picker Methods

##### refresh(callback, startColumnIndex)
Reinitialize picker, such as update `data`, `default-index` or `invalid-index`

|Parameters | Description | Type|
|----|-----|------|
|callback|initialization complete callback|Function|
|startColumnIndex|index of the column to start resetting, default is 0|Function|

##### getColumnValue(index): activeItemValue
Get data of the currently selected option in a column, need to be called after the `initialed` event is fired or asynchronously

|Parameters | Description | Type|
|----|-----|------|
|index|index of column|Number|

Returns

|Props | Description | Type|
|----|-----|------|
|activeItemValue|data of selected option|Object: {value, lable, ...}|

##### getColumnValues(): columnsValue
Get dataset of all column selections, need to be called after the `initialed` event is fired or asynchronously

Returns

|Props | Description | Type|
|----|-----|------|
|columnsValue|dataset of all column selections|Array<{value, lable, ...}>|

##### getColumnIndex(index): activeItemIndex
Get index of the currently selected option in a column, need to be called after the `initialed` event is fired or asynchronously

|Parameters | Description | Type|
|----|-----|------|
|index|index of column|Number|

Returns

|Props | Description | Type|
|----|-----|------|
|activeItemIndex|index of selected option|Number|

##### getColumnIndexs(): columnsIndex
Get indexes of all column selections, need to be called after the `initialed` event is fired or asynchronously

Returns

|Props | Description | Type|
|----|-----|------|
|columnsIndex|indexes of all column selections|Array|

##### setColumnValues(index, values, callback)
Set data for a column

|Parameters | Description | Type|
|----|-----|------|
|index|index of column|Number|
|values|data of column|Array<{value, lable, ...}>|
|callback|setting complete callback|Function|

#### Picker Events

##### @initialed()
Picker data initialization completion, callable `getColumnIndex`, `getColumnIndexs`, `getColumnValue`, `getColumnValues`

##### @change(columnIndex, itemIndex, value)
Picker selections change

|Parameters | Description | Type|
|----|-----|------|
|columnIndex|index of changing column|Number|
|itemIndex|index of changing option|Number|
|value|data of changing column selection|Object: {value, lable, ...}|

##### @confirm(columnsValue)
Picker confirm selection (only when `is-view` is `false`）

|Parameters | Description | Type|
|----|-----|------|
|columnsValue|dataset of all column selections|Array<{value, lable, ...}>|

##### @cancel()
Picker cancel selection (only when `is-view` is `false`）

##### @show()
Picker has been displayed (only when `is-view` is `false`）

##### @hide()
Picker has been hidden (only when `is-view` is `false`）

### Appendix

* Non-cascade data source data format

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

* Cascade data source data format

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
