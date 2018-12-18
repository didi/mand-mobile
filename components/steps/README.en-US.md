---
title: Steps
preview: https://mand-mobile.github.io/2x-doc/examples/#/steps
---

A navigation bar helps users complete tasks through the process and displays the current step

### Import

```javascript
import { Steps } from 'mand-mobile'

Vue.component(Steps.name, Steps)
```

### Code Examples
<!-- DEMO -->

### API

#### Steps Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|steps|array of step information|Array<{name, text}>|-|-|
|current|current step|Number|`0`|support for decimal point|
|direction| to specify the direction of the step bar|String|`horizontal`|`horizontal`, `vertical`|
|transition|progress change transition|Boolean|`false`|-|
|vertical-adaptive|step height adaptive|Boolean|`false`|only for `vertical`, ** if set to `true` then adaptive according to container height, setting `.mfe-steps` height is necessary**|

#### Steps Slots

#### reached

Slot of step icon that has been completed,  generally used to customize the completed step icon, and the `scoped slot` is supported as follows:

```html
<template slot="reached" slot-scope="{ index }">
  <!-- Custom icon if the index value is 1 -->
  <md-icon name="checked" v-if="index === 1"></md-icon>
  <!-- Default step icon -->
  <div class="step-node-default" v-else></div>
</template>
```

#### current

Slot of current step icon, generally used to customize the current step icon, supports `scoped slot` and has the same usage as `reached`

#### content

slot of step content

```html
<template
  slot="content"
  slot-scope="{ index, step }"
>
  <!-- index step index -->
  <!-- step step data -->
</template>
```