---
title: Cashier 收银台
preview: https://didi.github.io/mand-mobile/examples/#/cashier
---

业务支付弹窗，支持支付渠道选择和支付验证码发送

### 引入

```javascript
import { Cashier } from 'mand-mobile'

Vue.component(Cashier.name, Cashier)
```

### 代码演示
<!-- DEMO -->

### API

#### Cashier Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|收银台是否显示|Boolean|`false`|-|
|channels|支付渠道数据源|Array<{text, value, icon, iconSvg, action}>|`[]`|`icon`可作为`className`或组件`Icon`的`name`属性, `iconSvg`为是否使用svg图标, `action`为特殊动作|
|default-index|默认选中支付渠道索引|Number|`0`|-|
|title|收银台弹窗标题|String|`支付`|-|
|payment-title|支付金额标题|String|`支付金额`|支持`html fragment`|
|payment-amount|支付金额|String|`0.00`|支持`html fragment`|
|payment-describe|支付金额说明|String|-|支持`html fragment`|
|pay-button-text|确认支付按钮文案|String|`确认支付`|支持`html fragment`|
|pay-button-disabled|禁用支付按钮|Boolean|`false`|-|
|more-button-text|更多支付渠道按钮文案|String|`更多支付方式`|支持`html fragment`|

#### Cashier Methods

##### next(scene, option)
进入收银台下一步

|参数 | 说明 | 类型 | 默认值| 备注|
|-----|-----|-----|-----|-----|
| scene | 步骤场景标识 | String | - | `captcha`(发送验证码), `loading`(支付中), `success`(支付成功), `fail`(支付失败) |
| option | 当前步骤场景配置 | Object |属性如下所示|-|

* `captcha` option

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|text|发送验证码说明 | String |-|-|
|brief|发送验证码简要描述 | String |-|-|
|maxlength|验证码位数 | Number  |`4`|若为`-1`则不限制输入长度|
|count|验证码重新发送倒计时 | Number  |`60`|若为`0`则不显示重新发送|
|autoCountdown|是否自动开始倒计时，否则需手动调用`countdown`|Boolean|`true`|-|
|countNormalText|发送验证码正常状态文字|String| `发送验证码` |-|
|countActiveText|发送验证码及倒计时按钮文案配置项|String| `{$1}秒后重发` |-|
|onSend|验证码发送回调 | Function(countdown: Function) |-|`countdown`为开始倒计时方法|
|onSubmit|验证码提交回调 | Function(code: String) |-|`code`为输入的验证码|

* `loading` option

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|text|支付中说明 | String |`支付结果查询中...`|支持`html fragment`|

* `success` option

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|text|支付成功说明 | String |`支付成功`|支持`html fragment`|
|buttonText| 按钮文案 | String |`我知道了`|支持`html fragment`|
|handler| 按钮点击回调 | Function | - | - |

* `fail` option

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|text|支付失败说明 | String |`支付失败，请稍后重试`|支持`html fragment`|
|buttonText| 按钮文案 | String |`我知道了`|支持`html fragment`|
|handler| 按钮点击回调 | Function | - | - |

#### Captcha Slots

##### header
头部内容scoped插槽

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
支付渠道选中事件

##### @pay(item: {text, value})
支付渠道确认并发起支付事件

##### @cancel()
取消支付事件

##### @show()
收银台弹窗展示事件

##### @hide()
收银台弹窗隐藏事件
