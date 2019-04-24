---
title: Ruler
preview: https://didi.github.io/mand-mobile/examples/#/ruler
---

Slidable ruler<sup class="version-after">2.2.0+</sup>

### Import

```javascript
import { Ruler } from 'mand-mobile'

Vue.component(Ruler.name, Ruler)
```

### Code Examples
<!-- DEMO -->

### API

#### Ruler Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|current value|Number|0|-|
|scope|ruler scope|Number[]|[0, 100]|-|
|step|each large distance of the scale|Number|10|-|
|unit|scale each small distance|Number|1|-|
|min|minimum|Number|0|-|
|max|maximum|Number|100|-|
|stepTextPosition<sup class="version-after">2.2.1+</sup>|step text position|String|'top'|'top' and 'bottom'|
|stepTextRender<sup class="version-after">2.2.1+</sup>|step text render function|Function|noop|function should return string value|

#### Ruler Events

##### @change(currentValue)
Change value
