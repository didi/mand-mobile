---
title: ActivityIndicator 活动指示器
preview: https://didi.github.io/mand-mobile/examples/#/activity-indicator
---

活动指示器，一般用于正在进行中的任务示意 <sup class="version-after">1.4.0+</sup>

### 引入

```javascript
import { ActivityIndicator } from 'mand-mobile'

Vue.component(ActivityIndicator.name, ActivityIndicator)
```

### 代码演示
<!-- DEMO -->

### API

#### ActivityIndicator Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|type|类型|String|`roller`|`roller`, `spinner`, `carousel`|
|size|图标大小|Number|`70px`|单位`px`, 也可直接重置`.md-activity-indicator-svg`样式|
|width|图标宽度|Number|-|单位`px`, 仅用于类型`roller`|
|color|图标颜色|String|`#fc9153/dark`|`spinner`无法自定义色值，可选值只有`dark`和`light`|
|text-color|文字颜色|String|`#999`|也可直接重置`.md-activity-indicator-text`样式|
|text-size|文字大小|String|`70px`|也可直接重置`.md-activity-indicator-text`样式|
|vertical|图标文字是否垂直排列|Boolean|`false`|-|