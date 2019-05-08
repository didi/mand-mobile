---
title: TabPicker 多级联动选择器
preview: https://didi.github.io/mand-mobile/examples/#/tab-picker
---

底部级联选择的tab切换面板

### 引入

```javascript
import { TabPicker } from 'mand-mobile'

Vue.component(TabPicker.name, TabPicker)
```

### 代码演示
<!-- DEMO -->

### API

#### TabPicker 参数
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|控制显示或隐藏|Boolean|`false`| -|
|default-value|默认值|Array|`[]`|-|
|data|数据源|Array|`[]`|数据格式参考`附录`|
|title|弹窗标题|String|-|-|
|describe|弹窗描述文本|String|-|-|
|placeholder|默认提示文本|String|`请选择`|-|
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|


#### TabPicker 实例方法

##### getSelectedValues()
获取所有面板选中项的值

```
['value1', 'value2', 'value3']
```

##### getSelectedOptions()
获取所有面板选中项对象

```
[
  { value: 'value1', label: 'Item1' },
  { value: 'value2', label: 'Item2' },
  // ...
]
```

#### TabPicker 事件

##### @select(data)
选项选中事件

```
// data对象
{
  index: 0,
  value: 'value1',
  options: { value: 'value1', label: 'Item1' }
}
```

##### @change(data)
底部弹窗选中事件

```
// data对象
{
  values: ['value1', 'value2', 'value3'],
  options: [
    { value: 'value1', label: 'Item1' },
    { value: 'value2', label: 'Item2' },
    // ...
  ]
}
```

##### @show()
底部弹窗弹层展示事件

##### @hide()
底部弹窗弹层隐藏事件

#### TabPicker 插槽
选项插槽自定义

```
<md-tab-picker>
  <div slot="item" scoped-slot="{ option }">
    Hello, {{option.label}}
  </div>
</md-tab-picker>
```

### 附录

* 级联数据源数据格式

```javascript
{
  // 唯一键名
  name: '',
  // 面板标签
  label: '',
  // 选项列表
  options: [
    {
      // 选项值
      value: "",
      // 选项标签
      label: "",
      // 级联子面板
      children: {
        name: '',
        label: '',
        options: [
          // ...
        ]
      }
    }
  ]
}
```
