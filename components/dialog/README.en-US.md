---
title: Dialog
preview: https://didi.github.io/mand-mobile/examples/#/dialog
---

A floating layer to get users' feedback or display information.

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
| v-model | whether to show a dialog or not | Boolean | `false` | - |
| title | title of dialog | String | - | - |
| icon | name of icon | String | - |Refer to `Icon` component for customized icon|
| closable | whether the close button is visible or not | Boolean | `true` | - |
| btns | action buttons in the footer| Array {text, handler} | `[]` | - |
| append-to | portal node of dialog | HTMLElement | `document.body` | - |
| has-mask | has mask or not | Boolean | `true` | - |
| mask-closable | if the dialog will be closed when clicking mask| Boolean | `false` | - |
| position | the position of popup, `center/top/bottom/left/right` | String | `center`| - |
| transition | the animation effect of popup, `fade, slide-up/down/left/right`  | String | `fade` | - |
| prevent-scroll | whether to prevent scrolling or not| Boolean | false | - |
| prevent-scroll-exclude | excluded elements of preventing scrolling| String | - | - |

#### Dialog Slots
Default slots is used as the content of dialog

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

##### confirm(props)
Dynamically create a confirmation dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| icon | icon of message type | String | - |
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| cancelText | cancelation button | String | `Cancel` |
| confirmText | confirmation button | String | `Confirm` |
| onConfirm | callback function is invoked when user clicks confirmation button | Function | -|

##### Dialog.alert(props)
Dynamically create an alert dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| icon | icon of message type | String | - |
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| confirmText | confirmation button | String | `Confirm` |
| onConfirm | callback function is invoked when user clicks confirmation button | Function | -|

##### Dialog.succeed(props)
Dynamically create a success dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| confirmText | confirmation button | String | `Confirm` |
| onConfirm | callback function is invoked when user clicks confirmation button| Function | -|

##### Dialog.failed(props)
Dynamically create a fail dialog

| Props | Description | Type | Default |
|----|-----|------|------|
| title | title of dialog | String | - |
| content | content of dialog | String | -|
| confirmText | confirmation button | String | `Confirm` |
| onConfirm | callback function is invoked when user clicks confirmation button| Function | -|
