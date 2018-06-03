---
title: Cashier
preview: https://didi.github.io/mand-mobile/examples/#/cashier
---

Business payment pop-up window, support payment channel selection and payment verification code sending

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
|v-model|cashier display|Boolean|`false`|-|
|channels|payment channel data source|Array<{text, value, icon}>|`[]`|`icon` can be used as the `name` attribute of `className` or component `Icon`|
|default-index|default selected payment channel index|Number|`0`|-|
|title|cashier title|String|`支付`|-|
|payment-title|payment amount title|String|`支付金额`|support `html fragment`|
|payment-amount|payment amount|String|`0.00`|support `html fragment`|
|payment-describe|payment amount description|String|-|support `html fragment`|

#### Cashier Methods

##### next(scene, option)
Enter Cashier next

|Parameters | Description | Type | Default|
|----|-----|------|------|
| scene | step identifier, 'captcha(Send verification code)', 'loading(Payment in progress)', 'success(Payment success)', 'fail(Payment fail)' | String |-|
| option | current step configuration | Object |properties as follows|

* `captcha` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|send verification code instructions | String |-|support `html fragment`|
|maxlength|length of verification code | Number  |`4`|if `-1` does not limit the input length|
|count|verification code re-send countdown | Number  |`60`|if '0' is not displayed again|
|auto-countdown|start the countdown automatically, otherwise need to manually call `countdown`|Boolean|`true`|-|
|countNormalText|text of send verification code button |String| `发送验证码` |-|
|countActiveText|text of send verification code button in countdown state|String| `{$1}秒后重发`|-|
|onSend|verification code send Callback | Function(countdown: Function) |-|`countdown` starts counting down|
|onSubmit|verification code submission callback | Function(code: String) |-|`code` is the input verification code|

* `loading` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|Payment in progress instructions | String |`支付结果查询中...`|support `html fragment`|

* `success` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|Payment success instructions | String |`支付成功`|support `html fragment`|

* `fail` option

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text|Payment fail instructions | String |`支付失败，请稍后重试`|support `html fragment`|

#### Cashier Events

##### @select(item: {text, value})
Payment channel selected

##### @pay(item: {text, value})
Payment channels confirm and initiate payment

##### @cancel()
Cancel payment

##### @show()
Cashier has been displayed

##### @hide()
Cashier has been hidden
