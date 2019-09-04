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

### 使用指南

`input-item`的<b>表单校验</b>可使用第三方工具，如[vee-validate](https://baianat.github.io/vee-validate/)，使用示例可参考<a href="javascript:jumpAnchor('表单校验')">表单校验</a>


### 代码演示
<!-- DEMO -->

### API

#### InputItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|type|表单类型，特殊类型自带文本格式化|String|`text`|`text(文本)`,`bankCard(银行卡号)`,`phone(手机号)`,<br/>`money(金额)`,`digit(数字)`,`password(密码)`,<br/>以及其他的标准`Html Input`类型|
|preview-type <sup class="version-after">2.5.0+</sup>|表单预览类型|String|-|一般用于初始化时的特殊表单值（如带掩码的*身份证号，手机号*）预览，第一次触发编辑操作如点击退格键及其他字符键点击时，先**清空预填值并将表单类型切换至`type`**|
|name|表单名称|String|-|事件入参之一，可用于区分表单组件|
|v-model|表单值|String|-|-|
|title|表单左侧标题|String|-|可直接使用`slot left`代替|
|solid <sup class="version-after">2.2.1+</sup>|是否固定标题宽度，超出会自动换行|Boolean|`true`|-|
|placeholder|表单占位符|String|-|-|
|brief|表单描述|String|-|-|
|maxlength|表单最大字符数|String/Number|-|`phone`类型固定为11|
|size|表单尺寸|String|`normal`|`large`,`normal`|
|align|表单文本对齐方式|String|`left`|`left`,`center`,`right`|
|error|表单错误提示信息|String|-|-|
|readonly|表单是否只读|Boolean|`false`|-|
|disabled|表单是否禁用|Boolean|`false`|-|
|is-title-latent|表单标题是否隐藏|Boolean|`false`|表单获得焦点或内容不为空时展示|
|is-highlight|表单是否高亮|Boolean|`false`|表单获得焦点边框高亮|
|is-formative|表单文本是否根据类型自动格式化|Boolean|`type`为`bankCard`,`phone`, `money`默认为`true`，否则为`false`|-|
|is-amount|表单内容为金融数字|Boolean|`false`|-|
|formation|表单文本格式化回调方法|Function(name, curValue, curPos): {value: curValue, range: curPos}|-|传入参数`name`为表单名称，`curValue`为表单值，`curPos`为表单光标当前所在位置<br/>返回参数`value`格式化值, `range`表单光标格式化后所在位置|
|clearable|表单是否使用清除控件|Boolean|`false`|-|
|is-virtual-keyboard|表单是否使用金融数字键盘控件|Boolean|`false`|-|
|virtual-keyboard-disorder|金融数字键盘数字键乱序|Boolean|`false`|-|
|virtual-keyboard-ok-text|金融数字键盘确认键文案|String|`确定`|-|
|virtual-keyboard-vm|金融数字键盘`ref`名称|String|-|一般用于自定义键盘|

#### InputItem Slots

#### left
左侧插槽，一般用于放置图标等

#### right
右侧插槽，一般用于放置图标等

#### brief
表单描述插槽，一般用于描述内容较复杂，用`Props`中`brief`无法满足的情况，需用`v-if`控制（不推荐）

#### error
表单错误插槽，一般用于错误内容较复杂，用`Props`中`error`无法满足的情况，需用`v-if`控制，参考示例中的`错误提示`（不推荐）

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

### 表单校验

<iframe src="https://codesandbox.io/embed/5z344nk79x?autoresize=1&fontsize=12&module=%2Fsrc%2FApp.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>