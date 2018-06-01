---
title: InputItem 输入框
preview: https://didi.github.io/mand-mobile/examples/#/input-item
---

单行文本输入框，支持特殊场景文本格式化

### 引入

```javascript
import { InputItem } from 'mand-mobile'

Vue.component(InputItem.name, InputItem)
```

### 代码演示
<!-- DEMO -->

### API

#### InputItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|type|表单类型，特殊类型自带文本格式化|String|`text`|`text(文本)`,`bankCard(银行卡号)`,`phone(手机号)`,<br/>`money(金额)`,`digit(数字)`,`password(密码)`,<br/>以及其他的标准`Html Input`类型|
|name|表单名称|String|-|事件入参之一，可用于区分表单组件|
|v-model|表单值|String|-|-|
|title|表单左侧标题|String|-|可以传入`HtmlFragment`，也可直接使用`slot left`代替|
|placeholder|表单占位符|String|-|-|
|maxlength|表单最大字符数|String/Number|-|`phone`类型固定为11|
|size|表单尺寸|String|`normal`|`large`,`normal`|
|align|表单文本对齐方式|String|`left`|`left`,`center`,`right`|
|error|表单错误提示信息|String|-|-|
|readonly|表单是否只读|Boolean|`false`|-|
|disabled|表单是否禁用|Boolean|`false`|-|
|is-title-latent|表单标题是否隐藏|Boolean|`false`|表单获得焦点或内容不为空时展示|
|is-highlight|表单是否高亮|Boolean|`false`|只影响`placeholder`字体颜色|
|is-formative|表单文本是否根据类型自动格式化|Boolean|`type`为`bankCard`,`phone`, `money`默认为`true`，否则为`false`|-|
|formation|表单文本格式化回调方法|Function(name, curValue, curPos): {value: curValue, range: curPos}|-|传入参数`name`为表单名称，`curValue`为表单值，`curPos`为表单光标当前所在位置<br/>返回参数`value`格式化值, `range`表单光标格式化后所在位置|
|clearable|表单是否使用清除控件|Boolean|`false`|-|
|is-virtual-keyboard|表单是否使用金融数字键盘控件|Boolean|`false`|-|
|virtual-keyboard-disorder|金融数字键盘数字键乱序|Boolean|`false`|-|
|virtual-keyboard-ok-text|金融数字键盘确认键文案|String|`确定`|-|

#### InputItem Slots

#### left
左侧插槽，一般用于放置图标等

#### right
右侧插槽，一般用于放置图标等

#### InputItem Methods

##### focus()
表单获得焦点

##### blur()
表单失去焦点

##### getValue()
获取表单值

#### InputItem Events

##### @focus(name)
表单获得焦点事件

##### @blur(name)
表单失去焦点事件

##### @change(name, value)
表单值变化事件

##### @confirm(name, value)
表单值确认事件， 仅使用金融数字键盘或组件在`form`元素内时有效

##### @keyup(name, event)
表单按键按下事件，仅`is-virtual-keyboard`为`false`时触发

##### @keydown(name, event)
表单按键释放事件，仅`is-virtual-keyboard`为`false`时触发
