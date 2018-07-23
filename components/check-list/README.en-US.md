---
title: CheckList
preview: https://didi.github.io/mand-mobile/examples/#/check-list
---

Check list component. <sup class="version-after">1.5.0+</sup>

### Import

```javascript
import {  CheckList } from 'mand-mobile'

Vue.component(CheckList.name, CheckList)
```

### Code Examples
<!-- DEMO -->

### API

#### CheckList Props
|属性 | 说明 | 类型 | 默认值 | 备注 || Props | Description | Type | Default | Note ||----|-----|------|------|------|
|v-model|selected values|[String,Array]|-|-|
|options|option array|Array|-|-|
|max|max select options|Number|1|`0`: no limits; `1`: only allow select one; `2` or more: only allow select 2 options|
|disabled|whether disable selection or not|Boolean|false|-|
|title|title of select set|String|''|-|
|icon|icon of selected option|String|'right'|-|
|iconPosition|position of icon|String|'right'|-|
|iconSize|icon size|String|'sm'|-|

##### options
The structure of option array，`value` is required。
```
[
  { value: '', disabled: false }
]
```

#### CheckList Methods

##### select(value)

|Argument | Description | Type | Default |
|----|-----|------|------|
|value|the option value you want to add|[String, Array]|-|
