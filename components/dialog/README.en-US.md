---
title: Dialog
preview: https://didi.github.io/mand-mobile/examples/#/dialog
---

A floating layer to get user feedback or display information.

### How to Use

```javascript
import { Dialog } from 'mand-mobile'

Vue.component(Dialog.name, Dialog)
```

### Code Example
<!-- DEMO -->

### API

#### Dialog Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| v-model | Whether show dialog or not | Boolean | `false` | - |
| title | The title of dialog | String | - | - |
| icon | The icon of message type | String | - |Refer to `Icon` component |
| closable | Whether a close button is visible or not | Boolean | `true` | - |
| btns | Action buttons in footer area | Array {text, handler} | `[]` | - |
| append-to | The portal node of dialog | HTMLElement | `document.body` | - |
| has-mask | Whether show mask or not | Boolean | `true` | - |
| mask-closable | Whether to close the dialog when click mask or not | Boolean | `false` | - |
| position | The position of dialog when it is shown, `center/top/bottom/left/right` | String | `center`| - |
| transition | Dialog animation css class name, `fade, slide-up/down/left/right`  | String | `fade` | - |
| prevent-scroll | Whether stop body scroll or not | Boolean | false | - |
| prevent-scroll-exclude | Included elements from scrolling | String | - | - |

#### Dialog Slots
Default slots is treated as content of dialog.

#### Dialog Instance Methods

##### close()
Hide dialog.

#### Dialog Instance Events

##### @show()
Emit after dialog is shown.

##### @hide()
Emit after dialog is hidden.

#### Dialog Static Methods
Dynamically create interaction dialog.

##### confirm(props)
Dynamically create a confirm dialog.

| Props | Description | Type | Default |
|----|-----|------|------|
| icon | The icon of message type | String | - |
| title | The title of dialog | String | - | - |
| content | The message content of dialog | String | -|
| cancelText | Text of cancel button | String | `Cancel` |
| confirmText | Text of confirm button | String | `Confirm` |
| onConfirm | Callback when user click confirm button | Function | -|

##### Dialog.alert(props)
Dynamically create a alert dialog.

| Props | Description | Type | Default |
|----|-----|------|------|
| icon | The icon of message type | String | - |
| title | The title of dialog | String | - | - |
| content | The message content of dialog | String | -|
| confirmText | Text of confirm button | String | `Confirm` |
| onConfirm | Callback when user click confirm button | Function | -|

##### Dialog.succeed(props)
Dynamically create a succeed dialog.

| Props | Description | Type | Default |
|----|-----|------|------|
| title | The title of dialog | String | - | - |
| content | The message content of dialog | String | -|
| confirmText | Text of confirm button | String | `Confirm` |
| onConfirm | Callback when user click confirm button | Function | -|

##### Dialog.failed(props)
Dynamically create a failed dialog.

| Props | Description | Type | Default |
|----|-----|------|------|
| title | The title of dialog | String | - | - |
| content | The message content of dialog | String | -|
| confirmText | Text of confirm button | String | `Confirm` |
| onConfirm | Callback when user click confirm button | Function | -|
