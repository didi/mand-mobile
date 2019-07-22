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
|type|theme type|String|`default`|`default`, `primary`, `warning`, `disabled`, `link`|
|native-type|button type|String|`button`|-|
|size|-|String|`large`|`large/small`|
|plain|-|Boolean|`false`|-|
|round|-|Boolean|`false`|-|
|inline|-|Boolean|`false`|-|
|icon|-|String|-|refer to `Icon` for optional values|
|icon-svg|use svg icon|Boolean|`false`|-|
|inactive|-|Boolean|`false`|The button is not clickable which is inactive or disabled. The former is generally used for subjective factors such as invalid form validation, and the latter is used for objective factors such as no permission or no inventory|
|loading|loading state|Boolean|`false`|-|

#### Button Events

##### @click(event)
Button click event
