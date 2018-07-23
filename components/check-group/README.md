---
title: CheckGroup 选择项组
preview: https://didi.github.io/mand-mobile/examples/#/check-group
---

无 UI 的抽象选择项基础组件, 可根据具体场景自定义样式. <sup class="version-after">1.5.0+</sup>

### 引入

```javascript
import {  CheckGroup } from 'mand-mobile'

Vue.component(CheckGroup.name, CheckGroup)
```

### 代码演示
<!-- DEMO -->

### API

#### CheckGroup Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|选中的值|[String,Array]|-|若为单选则用`String`, 若为多选则是`Array`|
|options|选择项数组|Array|-|-|
|max|最多选择几项|Number|1|为1为单选,为0不限制数量,大于1则是限制至多选择数量|
|disabled|是否禁用选择|Boolean|false|-|

##### options
选择项数组格式如下，其中`value`值必填, 其余为选填, 可添加自定义字段。
```
[
  { value: '', disabled: false }
]
```

#### CheckGroup Methods

##### select(value)

|参数 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|value|即将新增的选中选项值|[String, Array]|-|

#### CheckGroup Slots
`CheckGroup`的默认插槽将被作为列表项模板使用, 会暴露`{option, select}`给`slot-scope`使用。其中`option`在原有选项配置对象里新增了`isSelected`字段布尔值。

```
<md-check-group
  v-model="selected"
  :options="options"
>
  <div slot-scope="{ option, select }" @click="select(option.value)">
    ...
  </div>
</md-check-group>
```
