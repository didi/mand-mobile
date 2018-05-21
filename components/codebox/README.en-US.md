---
title: CodeBox
preview: https://didi.github.io/mand-mobile/examples/#/codebox
---

### Import

```javascript
import { Codebox } from 'mand-mobile'

Vue.component(Codebox.name, Codebox)
```

### Code Examples
<!-- DEMO -->

### API

#### Codebox Props
| Props | Description | Type | Default |
|----|-----|------|------|
| v-model | controlled binding value | String | - |
| maxlength | maxlength, set to `-1` as no restriction | Number | 4 |
| autofocus | immediately open simulated keyboard, not working for system keyboard | Boolean | `false` |
| mask | whether mask code or not | Boolean | `false` |
| closable | whether hide keyboard when click away | Boolean | `true` |
| ok-text | confirm button text of keyboard |String| `Confirm` |
| disorder| whether use random keyboard layout or not | Boolean | `false` |
| system | whether use system keyboard or use simulated keyboard | Boolean | `false` |

#### Codebox Instance Methods

##### focus()

##### blur()

#### Codebox Events

#### @submit(code)
Emit when user submit
