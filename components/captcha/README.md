---
title: Captcha 验证码
preview: https://didi.github.io/mand-mobile/examples/#/captcha
---

验证码校验窗口

### 引入

```javascript
import { Captcha } from 'mand-mobile'

Vue.component(Captcha.name, Captcha)
```

### 代码演示
<!-- DEMO -->

### API

#### Captcha Props
|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|v-model|验证码窗口是否显示|Boolean|`false`|
|is-view|是否内嵌在页面内展示，否则以弹层形式|Boolean|`false`|
|maxlength|字符最大输入长度, 若为`-1`则不限制输入长度|Number|`4`|
|mask|是否掩码|Boolean|`false`|
|system|是否使用系统默认键盘|Boolean|`false`|
|title|窗口标题|String|-|
|appendTo|挂载节点|HTMLElement|`document.body`|
|count|倒计时时长, 设置为0的时候不显示倒计时按钮|Number|`60`|


#### Captcha Methods

##### countdown()
手动重置倒计时

##### setError(message)
设置报错信息并显示

#### Captcha Events

##### @show()
验证码组件显示事件

##### @hide()
验证码组件隐藏事件

#### @send()
发送验证码事件, 点击重发按钮后触发及开始倒计时

##### @submit(code)
用户提交输入内容事件
