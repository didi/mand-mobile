---
title: DatePicker
preview: https://didi.github.io/mand-mobile/examples/#/date-picker
---

Date or time selecting, supports year/month/day/hour/minute and range selecting

### Import

```javascript
import { DatePicker } from 'mand-mobile'

Vue.component(DatePicker.name, DatePicker)
```

### Code Examples
<!-- DEMO -->

### API

#### DatePicker Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|type|type of selection|String|`date`|`date`, `time`, `datetime`, `custom`|
|custom-types|customized type contains `date element`, `[yyyy, MM, dd, hh, mm]`|Array|-|valid when the value of type is `custom`|
|min-date|selectable min date(time)|Date|-|-|
|max-date|selectable max date(time)|Date|-|-|
|default-date|initial selected date|Date|-|-|
|minute-step|increasing steps of minutes|Number|`1`|-|
|unit-text|element unit for text displaying|Array|`['y', 'M', 'd', 'h', 'm']`|`text-render` for complex logic|
|text-render|customized option for text displaying|Function(typeFormat, column0Value, column1Value, ...): String|-|`unit-text` is invalid when using `text-render`, refer to `Appendix`|              
|today-text|displaying text of today|String|`today`|use `&` to take placeholder date, like `&(today)`| 
|line-height|line height of options|Number|`45`|unit `px`|          
|is-view|inline-display in page, otherwise it shows as `Popup`|Boolean|`false`|-| 
|title|title of date-picker|String|-|-|
|describe|description of date-picker|String|-|-|
|ok-text|confirmation text|String|`confirm`|-| 
|cancel-text|cancellation text|String|`cancel`|-| 
|mask-closable|if popup can be closed through clicking mask|String|`true`|-|

#### DatePicker Methods

##### getFormatDate(format): dateStr
Get a date string in a specific format (the `date element` of `format` exists in the column data), which is called after `initialed` event is invoked or asynchronously called

|Parameters | Description | Type | Default |
|----|-----|------|------|
|format|format|String|`yyyy-MM-dd hh:mm`|

Returns

|Props | Description | Type |
|----|-----|------|
|dateStr|date string|String|

> Refer to #Appendix for attributes of list items

##### getColumnValue(index): activeItemValue
Get value of the currently selected item in the column, which is called after `initialed` event is invoked or asynchronously called

|Parameters | Description | Type|
|----|-----|------|
|index|index of column|Number|

Returns

|Props | Description | Type|
|----|-----|------|
|activeItemValue|value of selected item|Object: {value, lable, ...}|

##### getColumnValues(): columnsValue
Get all values of currently seleted items, which is called after `initialed` event is invoked or asynchronously called

Returns

|Props | Description | Type|
|----|-----|------|
|columnsValue|values of all selected items in the column|Array<{value, lable, ...}>|

##### getColumnIndex(index): activeItemIndex
Get the index of the currently selected item in the column, which is called after `initialed` event is invoked or asynchronously called

|Parameters | Description | Type|
|----|-----|------|
|index|index of column|Number|

Returns

|Props | Description | Type|
|----|-----|------|
|activeItemIndex|index of selected item|Number|

##### getColumnIndexs(): columnsIndex
Get all indexes in the column, which is called after `initialed` event is invoked or asynchronously called

Returns

|Props | Description | Type|
|----|-----|------|
|columnsIndex|indexes of seletced items in the column|Array|

#### DatePicker Events

##### @initialed()
Initialize date picker, callable functions are `getColumnIndex`, `getColumnIndexs`, `getColumnValue`, `getColumnValues`

##### @change(columnIndex, itemIndex, value)
Change selections of date picker

|Parameters | Description | Type|
|----|-----|------|
|columnIndex|change the index of column|Number|
|itemIndex|change the index of selected item|Number|
|value|change the value of selected item|Object: {value, lable, ...}|

##### @confirm(columnsValue)
Confirm the selection of date picker(only when `is-view` is `false`）

|Parameters | Description | Type|
|----|-----|------|
|columnsValue|values of selected items in the column|Array<{value, lable, ...}>|

#### Appendix

* columnData  

```javascript

const columnData = [
  // year
  [
    {
      text: 'Year 2017', // display date
      value: 2017, // display value
      typeFormat: 'yyyy' // the type of date: yyyy, MM, dd, hh, mm, HalfDay
    }
  ],
  // month, day, hour, minute
  [
    //..,
  ],
  // AM/PM
  [
    {
      text: 'am',
      value: 0,
      typeFormat: 'HalfDay'
    }, {
      text: 'pm',
      value: 1,
      typeFormat: 'HalfDay'
    }
  ]
]
```

* textRender

```javascript

  export default {
    // ...
    methods: {
      textRender() {
        const args = Array.prototype.slice.call(arguments)
        const typeFormat = args[0] // type
        const column0Value = args[1] // selected items in the first column
        const column1Value = args[2] // selected items in the second column
        const column2Value = args[3] // selected items in the third column
        // ...
      },
    }
    // ...
  }
```
