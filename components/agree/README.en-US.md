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
|----|-----|------|------|
| v-model | whether it is checked or not | Boolean | `false` |
| disabled | Whether to disable it or not | Boolean | `false` |
| size | The size of icon, can be set as `xs`, `sm`, `md`, `lg` | String | `md` |

#### Agree Instance Events

##### @change(name, checked)
Invoked when checked state is changed

| Props | Description | Type |
|----|-----|------|
| name | The unique name of radio button | Number/String |
| checked | Whether it is checked or not | Boolean |
