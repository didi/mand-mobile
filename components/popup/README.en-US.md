---
title: Popup
preview: https://didi.github.io/mand-mobile/examples/#/popup
---

Triggered by other controls, the screen slides out or pops up a custom content area

### Import

```javascript
import { Popup, PopupTitleBar } from 'mand-mobile'

Vue.component(Popup.name, Popup)
Vue.component(PopupTitleBar.name, PopupTitleBar)
```

### Code Examples
<!-- DEMO -->

### API

#### Popup Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|popup display|Boolean|`false`|-|
|has-mask|masked layer|Boolean|`true`|-|
|mask-closable|click on the mask to close the popup|Boolean|`true`|-|
|position|popup position|String|`center`|`center`, `top`, `bottom`, `left`, `right`|
|transition|popup over animation|String|`fade, slide-up/down/left/right`|-|
|prevent-scroll|prevent rolling through|Boolean|`false`|-|
|prevent-scroll-exclude|exclusions of preventing rolling through|String/HTMLElement|-|-|

#### PopupTitleBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|title of popup|String|-|-|
|ok-text|text of confirmation|String|-|no confirmation button if empty|
|cancel-text|text of cancellation|String|-|no cancel button if empty|

#### Popup Events

#### @beforeShow()
Popup will display

#### @show()
Popup has been displayed

#### @beforeHide()
Popup will hide

#### @hide()
Popup Popup has been hidden

#### PopupTitleBar Events

##### @confirm()
Confirm selection

##### @cancel()
Cancel selection
