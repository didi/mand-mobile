---
title: CodeBox 验证码输入框
preview: https://didi.github.io/mand-mobile/examples/#/codebox
---

验证码输入框

### 引入

```javascript
import { Codebox } from 'mand-mobile'

Vue.component(Codebox.name, Codebox)
```

### 代码演示
<!-- DEMO -->

### API

#### Codebox Props
|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|v-model|验证码字符串|String|-|
|maxlength|字符最大输入长度, 若为`-1`则不限制输入长度|Number|4|
|autofocus|是否直通聚焦拉起键盘, 对系统键盘不生效|Boolean|`false`|
|mask|是否掩码|Boolean|`false`|
|closable|点击输入框及键盘其他区域是否收起键盘|Boolean|`true`|
|ok-text|键盘确认键文案|String|`确认`|
|disorder|数字键盘是否乱序|Boolean|`false`|
|system|是否使用系统默认键盘|Boolean|`false`|

#### Codebox Methods

##### focus()
聚焦输入

##### blur()
失焦隐藏键盘

#### Codebox Events

#### @submit(code)
用户提交输入内容事件
