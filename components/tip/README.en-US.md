---
title: Tip
preview: https://didi.github.io/mand-mobile/examples/#/tip
---

Tooltip.

### How to Use

```javascript
import { Tip } from 'mand-mobile'

Vue.component(Tip.name, Tip)
```

### Code Example
<!-- DEMO -->

### API

#### Tip Props
| Props | Description | Type | Default |
|----|-----|------|------|------|
| content | Message content | String | Number | - |
| placement | Position of tip | String | `top`, `left`, `bottom`, `right` | `top` |

#### Tip Instance Events

##### @show()
Emit after dialog is shown.

##### @hide()
Emit after dialog is hidden.
