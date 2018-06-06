---
title: Tip
preview: https://didi.github.io/mand-mobile/examples/#/tip
---

Tooltip

### Import

```javascript
import { Tip } from 'mand-mobile'

Vue.component(Tip.name, Tip)
```

### Code Examples
<!-- DEMO -->

### API

#### Tip Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|------|
| content |the content of tip| String | Number | - |
| placement | the position of tip | String | `top` | `top`, `left`, `bottom`, `right`|

#### Tip Instance Events

##### @show()
Invoked after dialog is shown

##### @hide()
Invoked after dialog is hidden
