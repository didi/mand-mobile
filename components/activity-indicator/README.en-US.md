---
title: ActivityIndicator
preview: https://didi.github.io/mand-mobile/examples/#/activity-indicator
---

Activity indicator, generally used for ongoing tasks <sup class="version-after">1.4.0+</sup>

### Import

```javascript
import { ActivityIndicator } from 'mand-mobile'

Vue.component(ActivityIndicator.name, ActivityIndicator)
```

### Code Examples
<!-- DEMO -->

### API

#### ActivityIndicator Props
|Props | Description | Type | Default | Note|
|------|------|------|------|------|
|type|-|String|`roller`|`roller`, `spinner`, `carousel`|
|size|icon size|Number|`70px`|unit `px`, or reset `.md-activity-indicator-svg` style directly|
|color|icon color|String|`#fc9153/dark`|`spinner` cannot customize color value, the optional values are `dark` and `light`|
|text-color|text color|String|`#999`|or reset `.md-activity-indicator-text` style directly|
|text-size|text font size|String|`70px`|or reset `.md-activity-indicator-text` style directly|
|vertical|icon and text are arranged vertically|Boolean|`false`|-|