---
title: Popup
preview: https://didi.github.io/mand-mobile/examples/#/popup
---

A customized content area slides out or pops up on the screen, triggered by other controls.
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
|v-model|display popup or not|Boolean|`false`|-|
|has-mask|has mask or not|Boolean|`true`|-|
|mask-closable|if the popup will be closed when clicking mask|Boolean|`true`|-|
|position|the position of popup|String|`center`|`center`, `top`, `bottom`, `left`, `right`|
|transition|the animation effect of popup|String|`fade/fade-bounce/fade-slide/fade-zoom, slide-up/slide-down/slide-left/slide-right`|-|
|prevent-scroll|whether to prevent from scrolling or not|Boolean|`false`|this program still has scrolling penetration at the top and bottom of the content, recommend to use `ScrollView` as the scrolling area|
|prevent-scroll-exclude|excluded elements of prevented scrolling|String/HTMLElement|-|-|

#### PopupTitleBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|title of popup|String|-|-|
|ok-text|confirmation text|String|-|no confirmation button if empty|
|cancel-text|cancellation text|String|-|no cancellation button if empty|

#### Popup Events

#### @beforeShow()
Popup will be shown

#### @show()
Show popup

#### @beforeHide()
Popup will be hiden

#### @hide()
Hide popup

#### PopupTitleBar Events

##### @confirm()
Confirm selection

##### @cancel()
Cancel selection
