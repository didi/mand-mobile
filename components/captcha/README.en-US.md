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
| auto-send <sup class="version-after">2.5.8+</sup> |whether the `send` event is triggered during the first display, otherwise you need to manually click the send button|Boolean|`true`|
| auto-countdown |whether to automatically start the countdown after manually clicking the send button, otherwise you need to manually call `countdown`|Boolean|`true`|
| title |-|String|-|
| brief |-|String|-|-|
| append-to | portal node of dialog | HTML Element | `document.body` |
| count | counter duration, set as `0` to hide resend button | Number | `60` |
| count-normal-text |text of send verification code button |String| `发送验证码` |
| count-active-text |text of send verification code button in countdown state|String| `{$1}秒后重发` |



#### Captcha Methods

#### countdown()
Start the time counter

##### resetcount()
Reset the time counter

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
