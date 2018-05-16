---
title: Button
preview: https://didi.github.io/mand-mobile/examples/#/button
---

Button components for configuring different styles

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
|type|button type|String|`primary`|`primary`, `ghost`, `ghost-primary`, `link`|
|size|button size|String|`large`|`large`, `small`(only works if `type` is `ghost/ghost-primary`)|
|icon|button icon|String|-|optional values refer to `Icon`|
|disabled|whether is disabled|Boolean|`false`|-|

#### Button Events

##### @click(event)
Button click event
