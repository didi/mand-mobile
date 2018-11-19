---
title: Amount
preview: https://didi.github.io/mand-mobile/examples/#/amount
---

Financial figures, generally used for amounts, quantities, etc. <sup class="version-after">1.4.0+</sup>

### Import

```javascript
import { Amount } from 'mand-mobile'

Vue.component(Amount.name, Amount)
```

### Code Examples
<!-- DEMO -->

### API

#### Amount Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|value|-|Number|`0`|-|
|precision|-|Number|`2`|length of decimal part|
|is-round-up|number round off|Boolean|`true`|-|
|has-separator|insert thousand separators|Boolean|`false`|-|
|separator|thousand separator|String|`,`|-|
|is-capital|convert to chinese capital|Boolean|`false`|-|
|transition|use animation when number change|Boolean|`false`|-|
|duration|animation duration|Number|`1000`|unit `ms`|