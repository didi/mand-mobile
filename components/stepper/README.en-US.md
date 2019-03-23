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
|v-model | current value | Number/String |-|
|default-value |stepper initial value| Number/String|-|
|step|the number of steps can be changed and be a decimal|Number/String|`1`|
|min|minimum|Number/String|`-Infinity`|
|max|maximum|Number/String|`Infinity`|
|disabled|-| Boolean|`false`|
|read-only|-| Boolean|`false`|
|is-integer|only integers| Boolean|`false`|

#### Stepper Events

##### @change(currentValue)
Change value

##### @add(difference)
Triggered when the current value increases

|Props | Description | Type|
|----|-----|------|
|difference|Increased value|Number|

##### @reduce(difference)
Triggered when the current value decreases

|Props | Description | Type|
|----|-----|------|
|difference|Reduced value|Number|