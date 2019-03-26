---
title: Field
preview: https://didi.github.io/mand-mobile/examples/#/field
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
|brief|description|String|-|-|
|disabled|disable content operation|Boolean|`false`|-|
|solid|	the width of title is fixed or not|Boolean|`false`|-|
|plain|plain style|Boolean|`false`|-|

When use `disabled` prop, its descendants can use [inject](https://vuejs.org/v2/api/#provide-inject)to have access of `Field` ancestor.

```javascript
export default {
  name: 'your-component',

  inject: {
    rootField: {
      from: 'rootField',
      default: () => ({})
    }
  },

  computed: {
    disabled() {
      return this.rootField.disabled
    }
  },
}
```

#### Field Slots

##### default
default content slot

##### header
header content slot

##### action
header action slot

##### footer
footer content slot

---

#### FieldItem Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|title|String|-|-|
|content|description|String|-|-|
|addon|help info text|String|-|-|
|disabled|disable item operation|Boolean|false|-|
|arrow|arrow indicator|Boolean|false|-|

#### FieldItem Events
##### @click(event)
click event when not disabled

#### FieldItem Slots

##### default
default content slot

##### left
left content slot

##### right
right content slot

##### children
extra children slot
