---
title: CheckBox
preview: https://didi.github.io/mand-mobile/examples/#/check-box
---

Check box component.

### Import

```javascript
import {  CheckBox } from 'mand-mobile'

Vue.component(CheckBox.name, CheckBox)
```

### Code Examples
<!-- DEMO -->

### API

#### CheckBox Props
|属性 | 说明 | 类型 | 默认值 | 备注 || Props | Description | Type | Default | Note ||----|-----|------|------|------|
|v-model|selected values|[String,Array]|-|-|
|options|option array|Array|-|-|
|max|max select options|Number|1|`0`: no limits; `1`: only allow select one; `2` or more: only allow select 2 options|
|disabled|whether disable selection or not|Boolean|false|-|
|cols|how many cols you want to show each row|Number|0|default `0` is no limit

##### options
The structure of option array，`value` is required。
```
[
  { value: '', disabled: false }
]
```

#### CheckBox Methods

##### select(value)

|Argument | Description | Type | Default |
|----|-----|------|------|
|value|the option value you want to add|[String, Array]|-|
