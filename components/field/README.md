---
title: Field 区域列表组合
preview: https://didi.github.io/mand-mobile/examples/#/field
---

区域列表垂直排列，显示当前的内容、状态和可进行的操作

### 引入

```javascript
import { Field, FieldItem } from 'mand-mobile'

Vue.component(Field.name, Field)
Vue.component(FieldItem.name, FieldItem)
```

### 代码演示
<!-- DEMO -->

### API

#### Field Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|title|标题|String|-|-|

#### FieldItem Props
|属性 | 说明 | 类型 | 默认值 |备注|
|----|-----|------|------|------|
|name|标识|Number/String| `-1`|-|
|title|标题|String|-|-|
|brief|子标题|String|-|-|
|disabled|是否禁用|Boolean|`true`|-|
|arrow|箭头名称|String|-|`arrow-up`, `arrow-right`, `arrow-down`, `arrow-left`|
|customized|内容是否自定义|Boolean|是否有`slot`|-|
|align|自定义内容时，内容位置|String|`left`|`left`, `right`, `center`|
|value|内容|String|-|-|
|solid|是否固定标题宽度，超出会自动换行|Boolean|`false`|-|

#### FieldItem Events

##### @click(name)
点击事件

|属性 | 说明 | 类型|
|----|-----|------|
|name|fieldItem标识|Number/String|
