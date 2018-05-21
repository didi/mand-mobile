---
title: Dialog
preview: https://didi.github.io/mand-mobile/examples/#/dialog
---

A floating layer to get user feedback or display information.

### Import

```javascript
import { Dialog } from 'mand-mobile'

Vue.component(Dialog.name, Dialog)
```

### Code Examples
<!-- DEMO -->

### API

#### Dialog Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| v-model | whether show dialog or not | Boolean | `false` | - |
| title | title of dialog | String | - | - |
| icon | icon of message type | String | - |Refer to `Icon` component |
| closable | whether a close button is visible or not | Boolean | `true` | - |
| btns | action buttons in footer area | Array {text, handler} | `[]` | - |
| append-to | portal node of dialog | HTMLElement | `document.body` | - |
| has-mask | whether show mask or not | Boolean | `true` | - |
| mask-closable | whether to close the dialog when click mask or not | Boolean | `false` | - |
| position | position of dialog when it is shown, `center/top/bottom/left/right` | String | `center`| - |
| transition | dialog animation css class name, `fade, slide-up/down/left/right`  | String | `fade` | - |
| prevent-scroll | prevent rolling breakdown | Boolean | false | - |
| prevent-scroll-exclude | exclusions of preventing rolling breakdown | String | - | - |

#### Dialog Slots
Default slots is treated as content of dialog

#### Dialog Instance Methods

##### close()
Hide dialog

#### Dialog Instance Events

##### @show()
Emit after dialog is shown

##### @hide()
Emit after dialog is hidden

#### Dialog Static Methods
Dynamically create interaction dialog

##### confirm(props)
Dynamically create a confirm dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| icon | icon of message type | String | - |
| title | title of dialog | String | - |
| content | message content of dialog | String | -|
| cancelText | text of cancel button | String | `Cancel` |
| confirmText | text of confirm button | String | `Confirm` |
| onConfirm | callback when user click confirm button | Function | -|

##### Dialog.alert(props)
Dynamically create a alert dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| icon | icon of message type | String | - |
| title | title of dialog | String | - |
| content | message content of dialog | String | -|
| confirmText | text of confirm button | String | `Confirm` |
| onConfirm | callback when user click confirm button | Function | -|

##### Dialog.succeed(props)
Dynamically create a succeed dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| title | title of dialog | String | - |
| content | message content of dialog | String | -|
| confirmText | text of confirm button | String | `Confirm` |
| onConfirm | callback when user click confirm button | Function | -|

##### Dialog.failed(props)
Dynamically create a failed dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| title | title of dialog | String | - |
| content | message content of dialog | String | -|
| confirmText | text of confirm button | String | `Confirm` |
| onConfirm | callback when user click confirm button | Function | -|
