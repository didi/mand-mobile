---
title: Field
preview: https://didi.github.io/mand-mobile/examples/#/Field
---

Arrange vertically and display current contents, status and other allowable operations.

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
|title|title|String|-|-|

#### FieldItem Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|name|name|Number/String|-1|-|
|title|title|Number/String|-|-|
|brief|subtitle|String|-|-|
|disabled|whether to disable it or not|Boolean|true|-|
|arrow|the name of arrow|String|-|`arrow-up`, `arrow-right`, `arrow-down`, `arrow-left`|
|customized|the content is customized or not|Boolean|have `slot` or not|-|
|align|the position of customized contents|String|left|`left`, `right`, `center`|
|value|content|String|-|-|
|solid|the width of title is fixed or not|Boolean|false|-|

#### FieldItem Events

##### @click(name)

Click event

|Props | Description | Type | 
|----|-----|------|
|name|the name of fieldItem|Number/String|