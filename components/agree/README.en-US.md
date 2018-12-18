---
title: Agree
preview: https://mand-mobile.github.io/2x-doc/examples/#/agree
---

For toggling states

### Import

```javascript
import { Agree } from 'mand-mobile'

Vue.component(Agree.name, Agree)
```

### Code Examples
<!-- DEMO -->

### API

#### Agree Props
| Props | Description | Type | Default |
|----|-----|------|------|------|
| v-model | checked | Boolean | `false` |-|
| disabled | - | Boolean | `false` |-|
| size | size of icon | String | `md` | refer to `Icon` for optional values |

#### Agree Instance Events

##### @change(name, checked)
Invoked when checked state is changed

| Props | Description | Type |
|----|-----|------|
| name | unique name of radio button | Number/String |
| checked | - | Boolean |
