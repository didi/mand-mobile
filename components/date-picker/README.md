---
title: DatePicker 时间选择器
preview: https://didi.github.io/mand-mobile/examples/#/date-picker
---

选择日期或者时间，支持年/月/日/时/分和按照范围选择

### 引入

```javascript
import { DatePicker } from 'mand-mobile'

Vue.component(DatePicker.name, DatePicker)
```

### 代码演示
<!-- DEMO -->

### API

#### DatePicker Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|type|日期选择类型|String|`date`|`date`, `time`, `datetime`, `custom`|
|custom-types|自定义类型包含的`日期元素`, `[yyyy, MM, dd, hh, mm]`|Array|-|仅用于type为`custom`|
|minDate|最小可选日期|Date|-|-|
|maxDate|最大可选日期|Date|-|-|
|default-date|初始选中日期|Date|-|-|
|minute-step|分钟数递增步长|Number|`1`|-|
|unit-text|元素单位展示文案设置|Array|`['年', '月', '日', '时', '分']`|复杂逻辑使用`text-render`|
|text-render|自定义选项展示文案方法|Function(typeFormat, column0Value, column1Value, ...): String|-|如果使用`text-render`则`unit-text`无效, 示例见附录|              
|today-text|今天展示文案设置|String|`今天`|使用`&`可占位日期数字，如`&(今天)`|           
|half-day-text|上下午展示文案设置|Array|`['上午', '下午']`|-|            
|is-twelve-hours|是否为12时制|Boolean|`false`|-|            
|is-view|是否内嵌在页面内展示, 否则以弹层形式|Boolean|`false`|-| 
|title|选择器标题|String|-|-| 
|ok-text|选择器确认文案|String|`确认`|-| 
|cancel-text|选择器取消文案|String|`取消`|-| 
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|

#### DatePicker Methods

##### getFormatDate(format): dateStr
获取特定格式的日期时间字符串（`format`中的`日期元素`需在列数据中存在），需在`initialed`事件触发之后或异步调用

|参数 | 说明 | 类型 | 默认 |
|----|-----|------|------|
|format|格式|String|`yyyy-MM-dd hh:mm`|

返回

|属性 | 说明 | 类型 |
|----|-----|------|
|dateStr|日期时间字符串|String|

> 列表项值属性介绍见附录

##### getColumnValue(index): activeItemValue
获取某列当前选中项的值，需在`initialed`事件触发之后或异步调用

|参数 | 说明 | 类型 |
|----|-----|------|
|index|列索引|Number|

返回

|属性 | 说明 | 类型 |
|----|-----|------|
|activeItemValue|选中项的值|Object: {text, value, typeFormat}|

##### getColumnValues(): columnsValue
获取所有列选中项的值，需在`initialed`事件触发之后或异步调用

返回

|属性 | 说明 | 类型 |
|----|-----|------|
|columnsValue|所有列选中项的值|Array<{text, value, typeFormat}>|

##### getColumnIndex(index): activeItemIndex
获取某列当前选中项的索引值，需在`initialed`事件触发之后或异步调用

|参数 | 说明 | 类型 |
|----|-----|------|
|index|列索引|Number|

返回

|属性 | 说明 | 类型 |
|----|-----|------|
|activeItemIndex|选中项的索引值|Number|

##### getColumnIndexs(): columnsIndex
获取所有列选中项的索引值，需在`initialed`事件触发之后或异步调用

返回

|属性 | 说明 | 类型 |
|----|-----|------|
|columnsIndex|所有列选中项的索引值|Array|

#### DatePicker Events

##### @initialed()
选择器数据初始化完成事件

##### @change(columnIndex, itemIndex, value)
选择器选中项更改事件

|参数 | 说明 | 类型 |
|----|-----|------|
|columnIndex|更改列的索引值|Number|
|itemIndex|更改列选中项的索引值|Number|
|value|更改列选中项的的值|Object: {text, value, typeFormat}|

##### @confirm(columnsValue)
选择器确认选择事件（仅`is-view`为`false`）

|参数 | 说明 | 类型 |
|----|-----|------|
|columnsValue|所有列选中项的值|Array<{text, value, typeFormat}>|

#### 附录

* columnData  

```javascript

const columnData = [
  // 年
  [
    {
      text: '2017年', // 日期元素展示文案
      value: 2017, // 日期元素数字
      typeFormat: 'yyyy' // 日期元素类型 yyyy, MM, dd, hh, mm, HalfDay
    }
  ],
  // 月, 日，时， 分
  [
    //..,
  ],
  // 上午/下午
  [
    {
      text: '上午',
      value: 0,
      typeFormat: 'HalfDay'
    }, {
      text: '下午',
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
        const typeFormat = args[0] // 类型
        const column0Value = args[1] // 第1列选中值
        const column1Value = args[2] // 第2列选中值
        const column2Value = args[3] // 第2列选中值
      },
    }
    // ...
  }
```
