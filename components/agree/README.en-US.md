---
title: Agree
preview: https://didi.github.io/mand-mobile/examples/#/agree
---

Toggle check state

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
| v-model | Controlled boolean value, whether is checked or not | Boolean | `false` |
| disabled | Whether disable it or not | Boolean | `false` |
| size | The size of component, can be set as `xs`, `sm`, `md`, `lg` | String | `md` |

#### Agree Instance Events

##### @change(name, checked)
Emit when check state changed

| Props | Description | Type |
|----|-----|------|
| name | The unique name of component | Number, String |
| checked | Whether it is checked or not | Boolean |
