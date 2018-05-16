---
title: InputItem
preview: https://didi.github.io/mand-mobile/examples/#/input-item
---

Single-line text input box to support special scene text formatting

### Import

```javascript
import { InputItem } from 'mand-mobile'

Vue.component(InputItem.name, InputItem)
```

### Code Examples
<!-- DEMO -->

### API

#### InputItem Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|type|input type, special type with text formatting|String|`text`|`text`,`bankCard`,`phone`,<br/>`money`,`password`|
|name|input name|String|-|one of the event arguments that can be used to distinguish multi inputs|
|v-model|value of input|String|-|-|
|title|label of input|String|-|support `HtmlFragment`，also use `slot(name: left)` instead|
|placeholder|placeholder of input|String|-|-|
|maxlength|maximum number of characters that can be entered|String/Number|-|`phone` type is fixed at 11|
|size|size of input|String|`normal`|`large`,`normal`|
|align|text alignment|String|`left`|`left`,`center`,`right`|
|error|error message|String|-|-|
|readonly|readonly|Boolean|`false`|-|
|disabled|disabled|Boolean|`false`|-|
|is-title-latent|floating Label|Boolean|`false`|label will display when input is focused or content is not empty|
|is-highlight|input highlighted|Boolean|`false`|only affects the `placeholder` color|
|is-formative|input text is automatically formatted according to the type|Boolean|`type` is `bankCard`, `phone`, `money` defaults to `true`, otherwise `false`|-|
|formation|input text formatting callback method|Function(name, curValue, curPos): {value: curValue, range: curPos}|-|incoming parameter `name` is the name of input, `curValue` is input value, `curPos` is the current position of input cursor, and the `value` formatted value is returned. `range` is the position of input cursor after formatting.|
|clearable|use clear control|Boolean|`false`|-|
|is-virtual-keyboard|use financial numeric keypad control|Boolean|`false`|-|
|virtual-keyboard-disorder|financial numeric keypad numbers keys out of order|Boolean|`false`|-|
|virtual-keyboard-ok-text|financial numeric keypad confirmation key text|String|`确定`|-|

#### InputItem Slots

#### left
Left slot, generally used to place icons, etc.

#### right
Right slot, generally used to place icons, etc.

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
Input value change

##### @confirm(name, value)
Input value confirmation, valid only when using a financial numeric keypad or component within a `form` element

##### @keyup(name, event)
key press, trigger only if is-virtual-keyboard is false

##### @keydown(name, event)
key release, trigger only if is-virtual-keyboard is false
