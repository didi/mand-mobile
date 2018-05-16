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

### Code Example
<!-- DEMO -->

### API

#### Tip Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|------|
| content | message content | String | Number | - |
| placement | position of tip | String | `top` | `top`, `left`, `bottom`, `right`|

#### Tip Instance Events

##### @show()
Emit after dialog is shown

##### @hide()
Emit after dialog is hidden
