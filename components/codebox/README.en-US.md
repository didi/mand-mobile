---
title: CodeBox
preview: https://mand-mobile.github.io/2x-doc/examples/#/codebox
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
| v-model | captcha | String | - |
| maxlength | maxlength of captacha, set to `-1` as no restriction | Number | `4` |
| autofocus | immediately open simulated keyboard, not work for system keyboard | Boolean | `false` |
| mask | whether to mask code or not | Boolean | `false` |
|disabled|disable input|Boolean|`false`|
|justify|take full space|Boolean|`false`|
| closable | whether to hide keyboard when clicking away | Boolean | `true` |
| ok-text | the text of confirmation button of the keyboard |String| `Confirm` |
| disorder| whether to use random keyboard layout or not | Boolean | `false` |
| system | whether to use system keyboard or simulated keyboard | Boolean | `false` |

#### Codebox Methods

##### focus()

##### blur()
Hide keyboard

#### Codebox Events

##### @submit(code)
Invoked when user submit
