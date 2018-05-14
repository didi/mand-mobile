---
title: Captcha
preview: https://didi.github.io/mand-mobile/examples/#/captcha
---
SMS code confirm dialog

### How to Use

```javascript
import { Captcha } from 'mand-mobile'

Vue.component(Captcha.name, Captcha)
```

### Code Example
<!-- DEMO -->

### API

#### Captcha Props
| Props | Description | Type | Default |
|----|-----|------|------|
| v-model | Whether show captcha or not | Boolean | `false` |
| is-view | Whether show as inline element or append to body | Boolean |`false`|
| maxlength | maxlength, set to `-1` as no restriction | Number | 4 |
| mask | Whether mask code or not | Boolean | `false` |
| system | Whether use system keyboard or use simulated keyboard | Boolean | `false` |
|title| The title of captcha | String | - |
| append-to | The portal node of dialog | HTMLElement | `document.body` | - |
| count | Counter duration, set as `0` to hide resend button | Number | `60` |


#### Captcha Methods

#### countdown()
Reset time counter

#### setError(message)
Set and show error message

#### Captcha Events

##### @show()
Emit when captcha is shown

#### @hide()
Emit when captcha is hidden

#### @send()
Emit when user click resend button

#### @submit(code)
Emit when user submit
