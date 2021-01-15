---
title: Dialog
preview: https://didi.github.io/mand-mobile/examples/#/dialog
---

A floating layer to get users' feedback or display information.

### Import

```javascript
import { Dialog } from 'mand-mobile'

Dialog.alert({ content: '' })

this.$dialog.alert({ content: '' }) // Totally Import
```

### Code Examples
<!-- DEMO -->

### API

#### Dialog Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| v-model | whether to show a dialog or not | Boolean | `false` | - |
| title | title of dialog | String | - | - |
| icon | name of icon | String | - |-|
| icon-svg | svg icon | Boolean |`false`|Refer to `Icon` component for customized icon|
| closable | whether the close button is visible or not | Boolean | `true` | - |
| layout | layout of action buttons, `row, column` | String | `row` | - |
| btns | action buttons in the footer| Array\<DialogBtnOptions\> | `[]` | - |
| append-to | portal node of dialog | HTMLElement | `document.body` | - |
| has-mask | has mask or not | Boolean | `true` | - |
| mask-closable | if the dialog will be closed when clicking mask| Boolean | `false` | - |
| transition <sup class="version-after">2.5.14+</sup>| the animation effect of dialog | String | `md-fade`| refer to [Transition](https://didi.github.io/mand-mobile/#/en-US/docs/components/feedback/transition?anchor=API) for optional values |

#### DialogBtnOptions Props

| Props | Description | Type | Default |
|----|-----|------|------|
|text|button text|String|-|
|handler|click callback|Function(btn: DialogBtnOptions)|-|
|warning|warning button|Boolean|`false`|
|disabled <sup class="version-after">2.4.0+</sup>|disabled button|Boolean|`false`|
|loading <sup class="version-after">2.4.0+</sup>|loading button|Boolean|`false`|
|icon|name of icon|String|-|
|iconSvg|svg icon|Boolean|`false`|

#### Dialog Slots

##### default

Default slots is used as the content of dialog

##### header

Header slot, generally used for placing pictures, etc <sup class="version-after">2.4.0+</sup>

---

#### Dialog Instance Methods

##### close()
Hide dialog

#### Dialog Instance Events

##### @show()
Invoked after dialog is shown

##### @hide()
Invoked after dialog is hidden

#### Dialog Static Methods
Dynamically create interactive dialogs

##### Dialog.confirm(props)
Dynamically create a confirmation dialog

| Props | Description | Type | Default |
|-----|-----|-----|-----|
| icon | icon of message type | String | - |
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| cancelText | cancelation button | String | `Cancel` |
| confirmText | confirmation button | String | `Confirm` |
| cancelWarning | clicking the Cancel button is a warning action | Boolean | `false` |
| confirmWarning | clicking the Confirm button is a warning action | Boolean | `false` |
| transition <sup class="version-after">2.5.14+</sup>| the animation effect of dialog | String | `md-bounce` |
| onConfirm | callback function is invoked when clicking confirmation button | Function | -|
| onCancel | callback function is invoked when clicking cancellation button | Function | -|
| onShow <sup class="version-after">2.5.0+</sup>| callback function is invoked when dialog is shown | Function | -|
| onHide <sup class="version-after">2.5.0+</sup>| callback function is invoked when dialog is hidden | Function | -|

##### Dialog.alert(props)
Dynamically create an alert dialog

| Props | Description | Type | Default |
|-----|-----|-----|-----|
| icon | icon of message type | String | - |
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| confirmText | confirmation button | String | `Confirm` |
| warning | clicking the Confirm button is a warning action | Boolean | `false` |
| transition <sup class="version-after">2.5.14+</sup>| the animation effect of dialog | String | `md-bounce` |
| onConfirm | callback function is invoked when clicking confirmation button | Function | -|
| onShow | callback function is invoked when dialog is shown | Function | -|
| onHide | callback function is invoked when dialog is hidden | Function | -|

##### Dialog.succeed(props)
Dynamically create a success dialog

| Props | Description | Type | Default |
|-----|-----|-----|-----|
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| confirmText | confirmation button | String | `Confirm` |
| transition <sup class="version-after">2.5.14+</sup>| the animation effect of dialog | String | `md-bounce` |
| onConfirm | callback function is invoked when clicking confirmation button| Function | -|
| onCancel | callback function is invoked when clicking cancellation button | Function | -|
| onShow | callback function is invoked when dialog is shown | Function | -|
| onHide | callback function is invoked when dialog is hidden | Function | -|

##### Dialog.failed(props)
Dynamically create a fail dialog

| Props | Description | Type | Default |
|-----|-----|-----|-----|
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| confirmText | confirmation button | String | `Confirm` |
| transition <sup class="version-after">2.5.14+</sup>| the animation effect of dialog | String | `md-bounce` |
| onConfirm | callback function is invoked when clicking confirmation button| Function | -|
| onCancel | callback function is invoked when clicking cancellation button | Function | -|
| onShow | callback function is invoked when dialog is shown | Function | -|
| onHide | callback function is invoked when dialog is hidden | Function | -|

##### Dialog.closeAll()
Close all global dialogs
