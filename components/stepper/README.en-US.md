---
title: Stepper
preview: https://didi.github.io/mand-mobile/examples/#/stepper
---

Increase, decrease or modify the current value

### Import

```javascript
import { Stepper } from 'mand-mobile'

Vue.component(Stepper.name, Stepper)
```

### Code Examples
<!-- DEMO -->

### API

#### Stepper Props
|Props | Description | Type | Default |
|---------|------|--------|----|
|default-value |stepper initial value| Number|-|
|step|the number of steps can be changed and be a decimal|Number|`1`|
|min|minimum|Number|`-Infinity`|
|max|maximum|Number|`Infinity`|
|disabled|-| Boolean|`false`|
|read-only|-| Boolean|`false`|

#### Stepper Events

##### @change(currentValue)
Change value
