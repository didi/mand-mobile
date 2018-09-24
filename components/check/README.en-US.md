---
title: Check
preview: https://didi.github.io/mand-mobile/examples/#/check
---

UI renderless check group component. <sup class="version-after">1.5.0+</sup>

### Import

```javascript
import {  CheckGroup } from 'mand-mobile'

Vue.component(CheckGroup.name, CheckGroup)
```

### Code Examples
<!-- DEMO -->

### API

#### CheckGroup Props
|属性 | 说明 | 类型 | 默认值 | 备注 || Props | Description | Type | Default | Note ||----|-----|------|------|------|
|v-model|selected values|[String,Array]|-|-|
|options|option array|Array|-|-|
|max|max select options|Number|1|`0`: no limits; `1`: only allow select one; `2` or more: only allow select 2 options|
|disabled|whether disable selection or not|Boolean|false|-|

##### options
The structure of option array，`value` is required。
```
[
  { value: '', disabled: false }
]
```

#### CheckGroup Methods

##### select(value)

|Argument | Description | Type | Default |
|----|-----|------|------|
|value|the option value you want to add|[String, Array]|-|

#### CheckGroup Slots
`CheckGroup` default slot will be used as template, and it will receive `{option, select}` from `slot-scope`. The `option` has all props you pass to component and `isSelected` prop.

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
