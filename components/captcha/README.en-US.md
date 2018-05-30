---
title: Captcha
preview: https://didi.github.io/mand-mobile/examples/#/captcha
---
SMS code confirming dialog

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
| v-model | whether to show captcha or not | Boolean | `false` |
| is-view | whether to show as inline element or append to the body | Boolean |`false`|
| maxlength | maxlength of string, set to `-1` as no restriction | Number | 4 |
| mask | whether to mask code or not | Boolean | `false` |
| system | Use system keyboard or simulated keyboard | Boolean | `false` |
| title| title of captcha | String | - |
| append-to | portal node of dialog | HTML Element | `document.body` |
| count | counter duration, set as `0` to hide resend button | Number | `60` |


#### Captcha Methods

#### countdown()
Manually reset the time counter

#### setError(message)
Set and show error message

#### Captcha Events

##### @show()
Invoked when captcha is shown

#### @hide()
Invoked when captcha is hidden

#### @send()
Invoked when user clicks resend button

#### @submit(code)
Invoked when user submits
