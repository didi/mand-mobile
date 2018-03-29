---
title: TabPicker 多级联动选择器
preview: https://didi.github.io/mand-mobile/examples/#/tab-picker
---

底部级联选择、非级联选择的tab切换的面板

### 引入

```javascript
import { TabPicker } from 'mand-mobile'

Vue.component(TabPicker.name, TabPicker)
```

### 使用指南

tab切换的title支持自定义渲染（通过slot-scope）
```html
  <!-- props 为每个tab标签的数据 -->
  <div
      slot="titles"
      slot-scope="props"
      class="title-item">
      标签dom
      {{ props.label }}
    </div>
```
异步级联面板支持传入slot
```html
  <!--异步获取数据loading slot-->
  <div slot="loading">loading内容</div>

  <!--异步获取数据异常 slot -->
  <div slot="error">数据异常</div>
```

### 代码演示
<!-- DEMO -->

### API

#### TabPicker Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|控制显示或隐藏|Boolean|`false`| -|
|data|数据源|Array|`[]`|参数据格式考`附录`|
|data-struct|数据级联类型|String|`noCascade`|`normal`, `cascade`, `async`|
|default-index|初始选中项索引|Array|`[]`|-|
|option-render|返回各选项渲染内容|Array<Function({text, disabled, ...}):String>|`[]`|`vue 2.1.0+`可使用`slot-scope`，见附录|
|async-func|异步获取数据函数|Function(value, callBack)|-|-|
|title|弹窗标题|Boolean|-|-|
|ok-text|确认按钮文案|String|`确认`|-|
|cancel-text|取消按钮文案|String|`取消`|-|


#### TabPicker Methods

#### getSelectedItem()
获取所有列选中项的值

返回

|属性 | 说明 | 类型|
|----|-----|------|
|columnsValue|所有列选中项的值|Array<{value, lable, ...}>|

#### TabPicker Events

#### @change(select)
底部弹窗选中事件

|属性 | 说明 | 类型|
|----|-----|------|
|select|各列选中项值|Object: {value,lable}|

#### @confirm(selected)
底部弹窗确认选择事件

|属性 | 说明 | 类型 |
|----|-----|------|
|selected|各列选中项值|Array<{value,lable}>|

#### @cancel()
底部弹窗取消选择事件

#### @show()
底部弹窗弹层展示事件

#### @hide()
底部弹窗弹层隐藏事件

### 附录

* 非级联数据源数据格式

```javascript
[
  {
    // 选项展示文案
    "label": "",
    // 以下自定义字段
    "value": "",
    //该选项下的列表
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

* 级联数据源数据格式

```javascript
[
  {
    // 选项展示文案
    "label": "",
    // 选项值
    "value": "",
    // 第二列对应数据
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

* 异步级联数据源数据格式

```javascript
{
  "options": [
    {
    // 选项展示文案
    "label": "",
    // 选项值
    "value": ""
    },
    //...
  ]
  "asyncFunc": (value, callback) => {
    callback(null, {
      "options": [
        {
          "label": '',
          "value": ''
        },
        //...
      ],
      "asyncFunc": (value, callback) => {
        //...
      }
    })
  }
}
```

* 自定义渲染option

```html
<template>
  <md-tab-picker
    :data="data"
  >
    <!-- option 为每个选项的数据 -->
    <li
      slot="option"
      slot-scope="props"
      class="option-item">
      公共dom样式
      <div v-if="props.index === 0" >
        第{{ props.index }}列dom样式 {{ props.option.label }}
      </div>
      <div v-else-if="props.index === 1">
        第{{ props.index }}列dom样式  {{ props.option.label }}
      </div>
      <div v-else>
        第{{ props.index }}列dom样式 {{ props.option.label }}
      </div>
    </li>
  </md-tab-picker>
</template>
```
