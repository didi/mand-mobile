---
title: Steps
preview: https://didi.github.io/mand-mobile/examples/#/steps
---

A navigation bar that guides the user through the process to complete the task and displays the current step

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
|steps | step information data source | Array | - | each element in the array must contain the `name` attribute as a step name|
|current | current step | Number | `0` | dynamically change current step by modifying the value|
