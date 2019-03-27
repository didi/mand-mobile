---
title: Ruler
preview: https://didi.github.io/mand-mobile/examples/#/ruler
---

Sliding selection

### Import

```javascript
import { Ruler } from 'mand-mobile'

Vue.component(Ruler.name, Ruler)
```

### Code Examples
<!-- DEMO -->

### API

#### [Ruler] Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|current value|Number|0|-|
|scope|ruler scope|Number[]|[0, 100]|-|
|step|each large distance of the scale|Number|10|-|
|unit|scale each small distance|Number|1|-|
|min|minimum|Number|0|-|
|max|maximum|Number|100|-|

#### [Ruler] Events

##### @change(currentValue)
Change value
