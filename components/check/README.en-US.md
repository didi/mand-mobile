---
title: Check
preview: https://mand-mobile.github.io/2x-doc/examples/#/check
---

UI renderless check group component

### Import

```javascript
import { Check, CheckBox, CheckGroup, CheckList } from 'mand-mobile'

Vue.component(Check.name, Check)
Vue.component(CheckBox.name, CheckBox)
Vue.component(CheckGroup.name, CheckGroup)
Vue.component(CheckList.name, CheckList)
```

### Code Examples
<!-- DEMO -->

### API

#### Check Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|unique name|Boolean/String|`true`|-|
|v-model|selected name|Boolean/String|`false`|-|
|disabled|whether disable selection or not|Boolean|`false`|-|

---

#### CheckBox Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|unique name|Boolean/String|`true`|-|
|v-model|selected name|Boolean/String|`false`|-|
|disabled|whether disable selection or not|Boolean|`false`|-|

---

#### CheckGroup Props
Check multiple checks. Combine with `Check` or `CheckBox`.

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|v-model|selected names|Array|-|-|
|max|max selected name length|Number|`0`|`0`: no limit|

#### CheckGroup Methods

##### check(name)

| Arg | Description | Type | Default |
|----|-----|------|------|
|name|name will be selected|String|-|

##### uncheck(name)

| Arg | Description | Type | Default |
|----|-----|------|------|
|name|name will be unselected|String|-|

##### toggle(name)

| Arg | Description | Type | Default |
|----|-----|------|------|
|name|name will be toggle|String|-|

---

#### CheckList Props
| Arg | Description | Type | Default | Note |
|----|-----|------|------|------|
|v-model|selected names|Array|-|-|
|options|data otpions|Array<{text, value, disabled, ...}>|`[]`|-|
|is-slot-scope|if it is mandatory to use `slot-scope`|Boolean|-|it depends on exact cases to determine whether to use it or not, and avoids adding `if/else` to component|

#### CheckList Slots
`CheckGroup` default slot will be used as template, and it will receive `{option}` from `slot-scope`.

```html
<template>
  <md-check-list :options="data">
    <template slot-scope="{ option }">
      <div class="custom-title" v-text="option.text"></div>
      <div class="custom-brief">{{ option.text }} custom description</div>
    </template>
  </md-check-list>
</template>
```
