---
title: Picker 选择器
preview: https://didi.github.io/mand-mobile/examples/#/picker
---

滚动多列选择

### 引入

```javascript
import { Picker } from 'mand-mobile'

Vue.component(Picker.name, Picker)
```

### 代码演示
<!-- DEMO -->

### API

#### Picker Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|选择器是否可见|Boolean|`false`|-|
|data|数据源|Array<{value, label, ...}>[]|`[]`|-|
|cols|数据列数|Number|`1`|-|
|default-index|选择器各列初始选中项索引|Array|`[]`|-|
|default-value|选择器各列初始选中项值|Array|`[]`|可用字段`text/label/value`|
|invalid-index|选择器各列不可用选项索引|Array|`[]`|某列多个不可用项使用数组，单个使用数字, 如`[[1,2], 2]`|
|line-height|选择器选项行高|Number|`45`|单位`px`|
|is-view|是否内嵌在页面内展示，否则以弹层形式|Boolean|`false`|-|
|is-cascade|各列数据是否级联|Boolean|`false`|级联数据格式见附录|
|keep-index <sup class="version-after">2.5.2+</sup>|当列数据变化时保持上次停留的位置|Boolean|`false`|仅用于级联数据|
|title|选择器标题|String|-|-|
|describe|选择器描述|String|-|-|
|ok-text|选择器确认文案|String|`确认`|-|
|cancel-text|选择器取消文案|String|`取消`|-|
|large-radius <sup class="version-after">2.4.0+</sup>|选择器标题栏大圆角模式|Boolean|`false`|-|
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|

#### Picker Methods

##### refresh(callback, startColumnIndex)
重新初始化选择器，如更新`data`、`default-index`、`invalid-index`或调用`setColumnValues`，该方法也可以使用[key](https://cn.vuejs.org/v2/api/#key)代替

|参数 | 说明 | 类型|
|----|-----|------|
|callback|初始化完成回调|Function|
|startColumnIndex|从某列开始重置，默认为0|Function|

##### getColumnValue(index): activeItemValue
获取某列当前选中项的值，需在`initialed`事件触发之后或异步调用

|参数 | 说明 | 类型|
|----|-----|------|
|index|列索引|Number|

返回

|属性 | 说明 | 类型|
|----|-----|------|
|activeItemValue|选中项的值|Object: {value, label, ...}|

##### getColumnValues(): columnsValue
获取所有列选中项的值，需在`initialed`事件触发之后或异步调用

返回

|属性 | 说明 | 类型|
|----|-----|------|
|columnsValue|所有列选中项的值|Array<{value, label, ...}>|

##### getColumnIndex(index): activeItemIndex
获取某列当前选中项的索引值，需在`initialed`事件触发之后或异步调用

|参数 | 说明 | 类型|
|----|-----|------|
|index|列索引|Number|

返回

|属性 | 说明 | 类型|
|----|-----|------|
|activeItemIndex|选中项的索引值|Number|

##### getColumnIndexs(): columnsIndex
获取所有列选中项的索引值，需在`initialed`事件触发之后或异步调用

返回

|属性 | 说明 | 类型|
|----|-----|------|
|columnsIndex|所有列选中项的索引值|Array|

##### setColumnValues(index, values, callback)
设置某列数据

|参数 | 说明 | 类型|
|----|-----|------|
|index|列索引|Number|
|values|列数据|Array<{value, label, ...}>|
|callback|列数据设置完成回调|Function|

#### Picker Events

##### @initialed()
选择器数据初始化完成事件，可调用`getColumnIndex`, `getColumnIndexs`, `getColumnValue`, `getColumnValues`方法

##### @change(columnIndex, itemIndex, value)
选择器选中项更改事件

|参数 | 说明 | 类型|
|----|-----|------|
|columnIndex|更改列的索引值|Number|
|itemIndex|更改列选中项的索引值|Number|
|value|更改列选中项的的值|Object: {value, label, ...}|

##### @confirm(columnsValue)
选择器确认选择事件（仅`is-view`为`false`）

|参数 | 说明 | 类型|
|----|-----|------|
|columnsValue|所有列选中项的值|Array<{value, label, ...}>|

##### @cancel()
选择器取消选择事件（仅`is-view`为`false`）

##### @show()
选择器弹层展示事件（仅`is-view`为`false`）

##### @hide()
选择器弹层隐藏事件（仅`is-view`为`false`）

### 附录

* 非级联数据源数据格式

```javascript
[
  [
    {
      // 选项展示文案
      "text": "",
      // 以下自定义字段
      "value": ""
    },
    // ...
  ],
  // ...
]
```

* 级联数据源数据格式

```javascript
[
  [
    {
      // 选项展示文案
      "text": "",
      // 第二列对应数据
      "children": [
        {
          "text": "",
          // 第三列对应数据
          "children": [
            // ...
          ]
        },
        // ...
      ]
      // 以下自定义字段
      "value": ""
    },
    // ...
  ]
]
```
