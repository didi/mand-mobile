---
title: InputItem
preview: https://didi.github.io/mand-mobile/examples/#/input-item
---

Single-line text input, supports text formatting in exact scenarios

### Import

```javascript
import { InputItem } from 'mand-mobile'

Vue.component(InputItem.name, InputItem)
```

### Instruction

<b>Validation</b> for `input-item` can use third-party tools, such as[vee-validate](https://baianat.github.io/vee-validate/). Examples can refer to<a href="javascript:jumpAnchor('Validation')">Validation</a>

### Code Examples
<!-- DEMO -->

### API

#### InputItem Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|type|input type, special type has text formatting|String|`text`|`text`,`bankCard`,`phone`,<br/>`money`,`password`|
|name|name of input|String|-|one of the event arguments, is used to distinguish multi inputs|
|v-model|value of input|String|-|-|
|title|title of input|String|-|support `HtmlFragment` and `slot(name: left)`|
|placeholder|placeholder of input|String|-|-|
|brief|description|String|-|-|
|maxlength|maximum number of characters that can be entered|String/Number|-|the maxlength of `phone` type is fixed at 11|
|size|size of input|String|`normal`|`large`,`normal`|
|align|text alignment|String|`left`|`left`,`center`,`right`|
|error|error message|String|-|-|
|readonly|readonly|Boolean|`false`|-|
|disabled|disabled|Boolean|`false`|-|
|is-title-latent|hide title or not|Boolean|`false`|title will be displayed when input is focused or content is not empty|
|is-highlight|the input is highlighted or not|Boolean|`false`|only affect the font color of `placeholder`|
|is-formative|if the input text is automatically formatted according to the type|Boolean|the default value is `true` when `type` is `bankCard`, `phone` or `money`, otherwise `false`|-|
|is-amount|the input is financial figures|Boolean|`false`|-|
|formation|input text formatting callback function|Function(name, curValue, curPos): {value: curValue, range: curPos}|-|passing parameter `name` is the name of input, `curValue` is input value, `curPos` is the current position of input cursor, and returned `value` is formatted value. `range` is the position of input cursor after formatting|
|clearable|use clear control or not|Boolean|`false`|-|
|is-virtual-keyboard|if use financial numeric keypad control|Boolean|`false`|-|
|virtual-keyboard-disorder|if number keys of financial numeric keypad is out of order|Boolean|`false`|-|
|virtual-keyboard-ok-text|confirmation key texts of financial numeric keypad|String|`confirm`|-|

#### InputItem Slots

#### left
Left slot, generally is used to place icons, etc.

#### right
Right slot, generally is used to place icons, etc.

#### brief
Description slot，generally used to description is more complicated, can not be satisfied with `brief` in `Props`, need to use `v-if` control.(Not recommended)

#### error
Error slot，generally used to error is more complicated, can not be satisfied with `error` in `Props`, need to use `v-if` control, refer to the 'input with error message' in the example.(Not recommended)

#### InputItem Methods

##### focus()
Input gets focus

##### blur()
Input loses focus

##### getValue()
Get value of input

#### InputItem Events

##### @focus(name)
Input gets focus

##### @blur(name)
Input loses focus

##### @change(name, value)
Change the value of input

##### @confirm(name, value)
Input value confirmation, valid only when using a financial numeric keypad or component within a `form` element

##### @keyup(name, event)
key press, is invoked only if `is-virtual-keyboard` is false

##### @keydown(name, event)
key release, is invoked only if `is-virtual-keyboard` is false

### Validation

<iframe src="https://codesandbox.io/embed/5z344nk79x?autoresize=1&fontsize=12&module=%2Fsrc%2FApp.vue" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>