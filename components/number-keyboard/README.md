---
title: NumberKeyboard 数字键盘
preview: https://didi.github.io/mand-mobile/examples/#/number-keyboard
---

一般用于密码，验证码或支付金额输入等金融场景

### 引入

```javascript
import { NumberKeyboard } from 'mand-mobile'

Vue.component(NumberKeyboard.name, NumberKeyboard)
```

### 代码演示
<!-- DEMO -->

### API

#### NumberKeyboard Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|v-model|键盘是否展示|Boolean|`false`|-|
|is-view|是否内嵌在页面内展示，否则以弹层形式|Boolean|`false`|-|
|type|键盘类型|String|`professional`|`professional`有确认键和小数点常用于价格或金额输入，`simple`一般用于密码或验证码输入|
|disorder|键盘数字键是否乱序|Boolean|`false`| -|
|is-hide-confirm|确认时自动隐藏键盘|Boolean|`true`| -|
|text-render|自定义指定按键的值|Function(value: string): string|-|可替换键`0,1,...9,.`|
|ok-text|键盘确认键文案|String|`确认`|-|

#### NumberKeyboard Slots

#### default

```html
<md-number-keyboard>
  <md-icon name="security"></md-icon>&nbsp;安全支付
</md-number-keyboard>
```

#### NumberKeyboard Methods

##### show()
展示键盘

##### hide()
隐藏键盘

#### NumberKeyboard Events

##### @enter(val)
数字键点击事件

属性 | 说明 | 类型
----|-----|------
val     | 数字 | Number

##### @delete()
回退键点击事件

##### @confirm()
确认键点击事件
