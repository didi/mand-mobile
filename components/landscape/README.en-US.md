---
title: Landscape
preview: https://didi.github.io/mand-mobile/examples/#/landscape
---

Used to display ads or descriptions in a floating layer

### Import

```javascript
import { Landscape } from 'mand-mobile'

Vue.component(Landscape.name, Landscape)
```

### Code Examples
<!-- DEMO -->

### API

#### Landscape Props
|Props | Description | Type | Default |
|----|-----|------|------|
|v-model|display popup layer|Boolean|`false`|
|has-mask|masked layer|Boolean|`true`|
|scroll|content area can be scrolled|Boolean|`false`|
|mask-closable|click on the mask to close popup layer|Boolean|`false`|

#### Landscape Events

##### @show()
Popup has been displayed

##### @hide()
Popup has been hidden
