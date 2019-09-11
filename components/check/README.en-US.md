---
title: Check
preview: https://didi.github.io/mand-mobile/examples/#/check
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
|name|unique name|any|`true`|-|
|v-model|selected name|any|`false`|-|
|label|option text|String|-|-|
|disabled|whether disable selection or not|Boolean|`false`|-|
|icon|icon name of checked options|String|`checked`|-|
|icon-inverse|icon name of unchecked options|String|`checke`|-|
|icon-disabled|icon name of disabled options|String|`check-disabled`|-|
|icon-svg<sup class="version-after">2.3.0+</sup>|use svg icon|Boolean|`false`|-|
|size|size of icon|String|`md`|-|

---

#### CheckBox Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|unique name|any|`true`|-|
|v-model|selected name|any|`false`|-|
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
|icon<sup class="version-after">2.3.0+</sup>|icon of selected option|String|`checked`|-|
|icon-inverse<sup class="version-after">2.3.0+</sup>|icon of unselected options|String|`check`|-|
|icon-disabled<sup class="version-after">2.3.0+</sup>|icon of disabled options|String|`check-disabled`|-|
|icon-size<sup class="version-after">2.3.0+</sup>|the size of icon|String|`md`|-|
|icon-svg<sup class="version-after">2.3.0+</sup>|use svg icon|Boolean|`false`|-|
|icon-position<sup class="version-after">2.3.0+</sup>|the position of icon|String|`right`|`left`, `right`|
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
