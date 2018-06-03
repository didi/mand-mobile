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
| v-model |show captcha or not | Boolean | `false` |
| is-view |show as inline element or append to body | Boolean |`false`|
| maxlength | maxlength, set to `-1` as no restriction | Number | 4 |
| mask |mask code or not | Boolean | `false` |
| system |use system keyboard or use simulated keyboard | Boolean | `false` |
|auto-countdown|start the countdown automatically, otherwise need to manually call `countdown`|Boolean|`true`|
| title| title of captcha | String | - |
| append-to | portal node of dialog | HTMLElement | `document.body` |
| count | counter duration, set as `0` to hide resend button | Number | `60` |
|countNormalText|text of send verification code button |String| `发送验证码` |
|countActiveText|text of send verification code button in countdown state|String| `{$1}秒后重发` |



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

#### @send(countdown)
Emit when user click resend button. The first time you open or click the reissue button triggers and starts the countdown. If `auto-countdown` is false, you need to manually call `countdown`.

#### @submit(code)
Emit when user submit
