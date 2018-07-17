---
title: CheckBox 复选框
preview: https://didi.github.io/mand-mobile/examples/#/check-box
---

复选框

### 引入

```javascript
import {  CheckBox } from 'mand-mobile'

Vue.component(CheckBox.name, CheckBox)
```

### 代码演示
<!-- DEMO -->

### API

#### CheckBox Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|选中的值|[String,Array]|-|若为单选则用`String`, 若为多选则是`Array`|
|options|选择项数组|Array|-|-|
|max|最多选择几项|Number|1|为1为单选,为0不限制数量,大于1则是限制至多选择数量|
|disabled|是否禁用选择|Boolean|false|-|
|cols|每行显示几列选项框|Number|0|默认`0`是无限制

##### options
选择项数组格式如下，其中`value`值必填, 其余为选填, 可添加自定义字段。
```
[
  { value: '', disabled: false }
]
```

#### CheckBox Methods

##### select(value)

|参数 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|value|即将新增的选中选项值|[String, Array]|-|
