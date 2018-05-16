---
title: NumberKeyboard
preview: https://didi.github.io/mand-mobile/examples/#/number-keyboard
---

Generally used for financial scenarios such as password, verification code or payment amount input

### Import

```javascript
import { NumberKeyboard } from 'mand-mobile'

Vue.component(NumberKeyboard.name, NumberKeyboard)
```

### Code Examples
<!-- DEMO -->

### API

#### NumberKeyboard Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|v-model|keyboard display|Boolean|`false`|-|
|is-view|inline display in page, otherwise it is in `Popup`|Boolean|`false`|-|
|type|keyboard type|String|`professional`|`professional` has confirmation key and decimal point are often used for price or amount input, `simple` is generally used for password or verification code input|
|disorder|keyboard numeric keys are out of order|Boolean|`false`| -|
|ok-text|confirm key text|String|`确认`|-|

#### NumberKeyboard Methods

##### show()
Display keyboard

##### hide()
Hide keyboard

#### NumberKeyboard Events

##### @enter(val)
Numeric key click

|Props | Description | Type|
|----|-----|------|
|val | value | Number|

##### @delete()
Delete key click

##### @confirm()
Confirmation key click
