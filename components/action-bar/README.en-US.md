---
title: ActionBar
preview: https://didi.github.io/mand-mobile/examples/#/action-bar
---

Bottom sidebar with a number of texts or action buttons that can be used to present form information and submit buttons

### Import

```javascript
import { ActionBar } from 'mand-mobile'

Vue.component(ActionBar.name, ActionBar)
```

### Instruction

ActionBar is fixed at the bottom of the page by `position: fixed`. In order to avoid the page content being occluded, you need to reserve a blank of not less than `100px` at the bottom (the iPhone also needs to add `constant(safe-area-inset-bottom)`).

### Code Examples
<!-- DEMO -->


### API

#### ActionBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|actions|button group|Array<{text, disabled, onClick}>|-|`text` is button text,<br/>`disabled`is whether to disable the button or not,<br/>`onClick`is click event callback function with the same parameters as the `click` event|

#### ActionBar Slots

##### default
left content

#### ActionBar Events

##### @click(event, action)
Button click event

|Props | Description | Type |
|----|-----|------|
|action|object corresponding to the clicked button in the actions list|Object: {text, disabled, ...}|
