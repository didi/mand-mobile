---
title: DatePicker
preview: https://didi.github.io/mand-mobile/examples/#/date-picker
---

Select date or time, support year/month/day/hour/minute and select by range

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
|type|selection type|String|`date`|`date`, `time`, `datetime`, `custom`|
|custom-types|custom element type contains `date element`, `[yyyy, MM, dd, hh, mm]`|Array|-|only for type 'custom'|
|minDate|minimum selectable date|Date|-|-|
|maxDate|maximum selectable date|Date|-|-|
|default-date|initial selection date|Date|-|-|
|minute-step|minutes increments|Number|`1`|-|
|unit-text|elemental unit display text|Array|`['年', '月', '日', '时', '分']`|complex logic use `text-render`|
|text-render|custom option display content method|Function(typeFormat, column0Value, column1Value, ...): String|-|If `text-render` is used then `unit-text` is invalid, refer to `Appendix`|              
|today-text|display text of today|String|`今天`|use `&` to take placeholder date numbers like `&(today)`|           
|half-day-text|display text of morning and afternoon|Array|`['上午', '下午']`|-|            
|is-twelve-hours|12 hours system|Boolean|`false`|-|            
|is-view|inline display in page, otherwise it is in `Popup`|Boolean|`false`|-| 
|title|title of picker|String|-|-| 
|ok-text|text of confirmation|String|`确认`|-| 
|cancel-text|text of cancellation|String|`取消`|-| 

#### DatePicker Methods

##### getFormatDate(format): dateStr
Get a datetime string in a specific format (the `date element` in `format` needs to exist in the column data) to be called after the `initialed` event fires or asynchronously

|Parameters | Description | Type | Default |
|----|-----|------|------|
|format|format|String|`yyyy-MM-dd hh:mm`|

Returns

|Props | Description | Type |
|----|-----|------|
|dateStr|date time string|String|

> List item value attributes see #Appendix

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

#### DatePicker Events

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

#### Appendix

* columnData  

```javascript

const columnData = [
  // year
  [
    {
      text: '2017年', // display text
      value: 2017, // display value
      typeFormat: 'yyyy' // element type yyyy, MM, dd, hh, mm, HalfDay
    }
  ],
  // month, day, hour, minute
  [
    //..,
  ],
  // morning/afternoon
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
        const column0Value = args[1] // selection of 1st column
        const column1Value = args[2] // selection of 2nd column
        const column2Value = args[3] // selection of 3rd column
        // ...
      },
    }
    // ...
  }
```
