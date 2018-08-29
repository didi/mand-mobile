---
title: Button
preview: https://didi.github.io/mand-mobile/examples/#/button
---

Button components for configuring different button styles

### Import

```javascript
import { Button } from 'mand-mobile'

Vue.component(Button.name, Button)
```

### Code Examples
<!-- DEMO -->

### API

#### Button Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|type|-|String|`default`|`default/primary/warning/disabled/link`|
|size|-|String|`large`|`large/small`|
|plain|-|Boolean|`false`|-|
|round|-|Boolean|`false`|-|
|inline|-|Boolean|`false`|-|
|icon|-|String|-|refer to `Icon` for optional values|
|inactive|-|Boolean|`false`|The button is not clickable which is inactive or disabled. The former is generally used for subjective factors such as invalid form validation, and the latter is used for objective factors such as no permission or no inventory.|

#### Button Events

##### @click(event)
Button click event
