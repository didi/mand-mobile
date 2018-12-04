---
title: Cashier
preview: https://didi.github.io/mand-mobile/examples/#/cashier
---

Business payment pop-up window, supports payment channel selecting and payment verification code sending

### Import

```javascript
import { Cashier } from 'mand-mobile'

Vue.component(Cashier.name, Cashier)
```

### Code Examples
<!-- DEMO -->

### API

#### Cashier Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model| display cashier or not|Boolean|`false`|-|
|channels|data source of payment channel |Array<{text, value, icon, iconSvg}>|`[]`|`icon` can be used as the `name` attribute of `className` or component `Icon`, `iconSvg` for using svg icon|
|channel-limit|show more payment channels button when the payment channels exceeds the limit|Number|`2`|-|
|default-index|default selected index of payment channel |Number|`0`|-|
|title|cashier title|String|`pay	`|-|
|payment-title|payment amount title|String|`支付金额(元)`|support `html fragment`|
|payment-amount|payment amount|String|`0.00`|support `html fragment`|
|payment-describe|the description of payment amount |String|-|support `html fragment`|
|pay-button-text|confirm payment button text|String|`确认支付`|support `html fragment`|
|more-button-text|more payment channels button text|String|`更多支付方式`|support `html fragment`|


#### Cashier Methods

##### next(scene, option)
To the next step of Cashier

|Parameters | Description | Type | Default| Note|
|-----|-----|-----|-----|-----|
| scene | step identifier | String |-| `captcha`(Send verification code), `loading`(Payment is in process), `success`(Payment succeed), `fail`(Payment failed) |
| option | the configuration of current step | Object |properties are listed as follows|-|

* `captcha` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|instructions of sending verification code | String |-| - |
|brief| brief of sending verification code | String |-| - |
|maxlength|length of verification code | Number  |`4`|`-1` means no restriction of the input length|
|count|countdown of resending verification code | Number  |`60`|`0` means no resending display |
|onSend|Callback of sending verification code| Function(countdown: Function) |-|`countdown` is the function of starting counting down|
|onSubmit|Callback of submitting verification code | Function(code: String) |-|`code` is the verification code|
|autoCountdown|start the countdown automatically, otherwise need to manually call `countdown`|Boolean|`true`|-|
|countNormalText|text of send verification code button |String| `发送验证码` |-|
|countActiveText|text of send verification code button in countdown state|String| `{$1}秒后重发`|-|

* `loading` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|The introduction of in-process payment | String |`payment result is loading...`|support `html fragment`|

* `success` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|The introduction of successful payment | String |`payment succeeds`|support `html fragment`|
|buttonText| button text | String |`我知道了`|support `html fragment`|
|handler| button clickback | Function | - | - |


* `fail` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|The introduction of unsuccessful payment | String |`payment fails, please try again later`|support `html fragment`|
|buttonText| button text | String |`我知道了`|support `html fragment`|
|handler| button clickback | Function | - | - |

#### Captcha Slots

##### header
Scoped slot of captcha header

```html
<div slot-scope="{ scene }" slot="header">
  <md-notice-bar
    v-if="scene === 'choose'"
    mode="closable"
    icon="warn"
    type="warning"
  ></md-notice-bar>
</div>
```

#### Cashier Events

##### @select(item: {text, value})
Payment channel selected

##### @pay(item: {text, value})
Confirm payment channels and initiate payment

##### @cancel()
Cancel payment

##### @show()
Display cashier

##### @hide()
Hide cashier
