---
title: Progress
preview: https://didi.github.io/mand-mobile/examples/#/progress
---

Progress circle, generally used to communicate data intuitively to users

### Import

```javascript
import { Progress } from 'mand-mobile'

Vue.component(Progress.name, Progress)
```

### Code Examples
<!-- DEMO -->

### API

#### Progress Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|value|progress value|Number|`0`|`0-1`|
|size|circle size|Number|`70`|unit `px`|
|width|circle stroke width|Number|-|unit `px`|
|color|circle stroke highlight color|String|`#fc9153`|-|
|border-color|circle stroke color|String|`rgba(0, 0, 0, .1)`|-|
|fill|circle fill color|String|`transparent`|-|
|linecap|shape of end|String|`round`|`round`, `butt`|
|rotate|-|Number|`0`|-|
|transition|use transition when value changes|Boolean|`false`|-|
|duration|transition duration|Number|`1000`|unit `ms`|

#### Progress Slots

##### default
slot inside circle, generally used to add text

##### defs
slot inside circle svg, generally used to add `defs`, `use` elements, etc
