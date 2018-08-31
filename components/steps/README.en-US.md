---
title: Steps
preview: https://didi.github.io/mand-mobile/examples/#/steps
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

#### Tabs Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|steps | array of step information | Array | - | each element in the array must contain the `name` attribute as a step name, when the ***direction*** is `'vertical'`, the `description` attribute display|
|current | current step | Number | `0` | dynamically change the current step by modifying this value|
|direction | to specify the direction of the step bar | String | `'horizontal'` | support `'horizontal'`, `'vertical'`|
