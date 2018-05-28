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

### Code Examples
<!-- DEMO -->


### API

#### ActionBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|actions|button group|Array<{text, disabled, onClick}>|-|`text` is button text,<br/>`disabled`is whether to disable the button or not,<br/>`onClick`is click event callback function with the same parameters as the `click` event|
|has-text|whether to show text|Boolean|whether it containss `slot`|text can be passed in `slot`|


#### ActionBar Events

##### @click(event, action)
Button click event

|Props | Description | Type |
|----|-----|------|
|action|object corresponding to the clicked button in the actions list|Object: {text, disabled, ...}|
