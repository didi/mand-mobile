---
title: Agree
preview: https://didi.github.io/mand-mobile/examples/#/agree
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
| icon-type <sup class="version-after">2.6.0+</sup> | select Icon | String | `circle` | optional value `circle` or `square` |
#### Agree Instance Events

##### @change(name, checked)
Invoked when checked state is changed

| Props | Description | Type |
|----|-----|------|
| name | unique name of radio button | Number/String |
| checked | - | Boolean |
