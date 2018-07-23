---
title: CheckList 复选列表
preview: https://didi.github.io/mand-mobile/examples/#/check-list
---

复选列表. <sup class="version-after">1.5.0+</sup>

### 引入

```javascript
import {  CheckList } from 'mand-mobile'

Vue.component(CheckList.name, CheckList)
```

### 代码演示
<!-- DEMO -->

### API

#### CheckList Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|选中的值|[String,Array]|-|若为单选则用`String`, 若为多选则是`Array`|
|options|选择项数组|Array|-|-|
|max|最多选择几项|Number|1|为1为单选,为0不限制数量,大于1则是限制至多选择数量|
|disabled|是否禁用选择|Boolean|false|-|
|title|标题|String|''|-|
|icon|选中图标|String|'right'|-|
|iconPosition|图标位置|String|'right'|-|
|iconSize|图标尺寸|String|'sm'|-|

##### options
选择项数组格式如下，其中`value`值必填, 其余为选填, 可添加自定义字段。
```
[
  { value: '', disabled: false }
]
```

#### CheckList Methods

##### select(value)

|参数 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|value|即将新增的选中选项值|[String, Array]|-|
