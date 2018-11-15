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
| auto-countdown<sup class="version-after">1.3.0+</sup>|start the countdown automatically, otherwise need to manually call `countdown`|Boolean|`true`|
| title|-|String|-|
| brief|-|String|-|-|
| append-to | portal node of dialog | HTML Element | `document.body` |
| count | counter duration, set as `0` to hide resend button | Number | `60` |
| countNormalText<sup class="version-after">1.3.0+</sup>|text of send verification code button |String| `发送验证码` |
| countActiveText<sup class="version-after">1.3.0+</sup>|text of send verification code button in countdown state|String| `{$1}秒后重发` |



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

#### @send(countdown)
Invoked when user clicks resend button. The first time you open or click the reissue button triggers and starts the countdown. If `auto-countdown` is false, you need to manually call `countdown`.

#### @submit(code)
Invoked when user submits
