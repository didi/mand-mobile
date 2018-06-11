---
title: Landscape
preview: https://didi.github.io/mand-mobile/examples/#/landscape
---

To display ads or descriptions in a floating layer

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
|v-model|display popup layer or not|Boolean|`false`|
|has-mask|has mask or not|Boolean|`true`|
|scroll|content area can be scrolled or not|Boolean|`false`|
|mask-closable|if popup layer can be closed through clicking on the mask|Boolean|`false`|

#### Landscape Events

##### @show()
Display popup

##### @hide()
Hide popup
