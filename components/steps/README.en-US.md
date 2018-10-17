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
|steps | array of step information | Array<{name, text}> |-|-|
|current | current step | Number | `0` |support for decimal point|
|direction | to specify the direction of the step bar | String | `'horizontal'` | support `'horizontal'`, `'vertical'`|
transition | progress change transition | Boolean | `false` |-|
