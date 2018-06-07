---
title: Field
<<<<<<< HEAD
preview: https://didi.github.io/mand-mobile/examples/#/Field
---

Arrange vertically and display current contents, status and other allowable operations.
=======
preview: https://didi.github.io/mand-mobile/examples/#/field
---

The list of areas is vertically arranged to show the current content, status, and operations that can be performed
>>>>>>> f958b88f3762172675797e1b805ba06c6df24c53

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
<<<<<<< HEAD
|title|title|String|-|-|
=======
|title|area title|String|-|-|
>>>>>>> f958b88f3762172675797e1b805ba06c6df24c53

#### FieldItem Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
<<<<<<< HEAD
|name|name|Number/String|-1|-|
|title|title|Number/String|-|-|
|brief|subtitle|String|-|-|
|disabled|whether to disable it or not|Boolean|true|-|
|arrow|the name of arrow|String|-|`arrow-up`, `arrow-right`, `arrow-down`, `arrow-left`|
|customized|the content is customized or not|Boolean|have `slot` or not|-|
|align|the position of customized contents|String|left|`left`, `right`, `center`|
|value|content|String|-|-|
|solid|the width of title is fixed or not|Boolean|false|-|
=======
|name|item name|Number/String| `-1`|-|
|title|item title|String|-|-|
|brief|item subtitle|String|-|-|
|disabled|-|Boolean|`true`|-|
|arrow|arrow name|String|-|`arrow-up`, `arrow-right`, `arrow-down`, `arrow-left`|
|customized|item content customization|Boolean|whether it containss `slot`|-|
|align|item content position|String|`left`|`left`, `right`, `center`|
|value|item content|String|-|-|
|solid|item title is fixed width, beyond the automatic wrap|Boolean|`false`|-|
>>>>>>> f958b88f3762172675797e1b805ba06c6df24c53

#### FieldItem Events

##### @click(name)
<<<<<<< HEAD

Click event

|Props | Description | Type | 
|----|-----|------|
|name|the name of fieldItem|Number/String|
=======
Item click

|Props | Description | Type |
|----|-----|------|
|name|item name|Number/String|
>>>>>>> f958b88f3762172675797e1b805ba06c6df24c53
