---
title: Captcha
preview: https://didi.github.io/mand-mobile/examples/#/captcha
---
SMS code confirm dialog

### Import

```javascript
import { Captcha } from 'mand-mobile'

Vue.component(Captcha.name, Captcha)
```

### Code Examples
<!-- DEMO -->

### API

#### Captcha Props
| Props | Description | Type | Default |
|----|-----|------|------|
| v-model | whether show captcha or not | Boolean | `false` |
| is-view | whether show as inline element or append to body | Boolean |`false`|
| maxlength | maxlength, set to `-1` as no restriction | Number | 4 |
| mask | whether mask code or not | Boolean | `false` |
| system | whether use system keyboard or use simulated keyboard | Boolean | `false` |
| title| title of captcha | String | - |
| append-to | portal node of dialog | HTMLElement | `document.body` |
| count | counter duration, set as `0` to hide resend button | Number | `60` |


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
