---
title: Field
preview: https://didi.github.io/mand-mobile/examples/#/field
---

The list of areas is vertically arranged to show the current content, status, and operations that can be performed

### Import

```javascript
import { Field, FieldItem } from 'mand-mobile'

Vue.component(Field.name, Field)
Vue.component(FieldItem.name, FieldItem)
```

### Code Examples
<!-- DEMO -->

### API

#### Field Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|area title|String|-|-|

#### FieldItem Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|name|item name|Number/String| `-1`|-|
|title|item title|String|-|-|
|brief|item subtitle|String|-|-|
|disabled|-|Boolean|`true`|-|
|arrow|arrow name|String|-|`arrow-up`, `arrow-right`, `arrow-down`, `arrow-left`|
|customized|item content customization|Boolean|whether it containss `slot`|-|
|align|item content position|String|`left`|`left`, `right`, `center`|
|value|item content|String|-|-|
|solid|item title is fixed width, beyond the automatic wrap|Boolean|`false`|-|

#### FieldItem Events

##### @click(name)
Item click

|Props | Description | Type |
|----|-----|------|
|name|item name|Number/String|
