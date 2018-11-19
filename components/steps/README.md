---
title: Steps 步骤条
preview: https://didi.github.io/mand-mobile/examples/#/steps
---

用于引导用户按照流程完成任务的导航条，显示当前所在步骤

### 引入

```javascript
import { Steps } from 'mand-mobile'

Vue.component(Steps.name, Steps)
```

### 代码演示
<!-- DEMO -->

### API

#### Steps Props
| 属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|steps | 步骤信息数组 | Array<{name, text}> |-|-|
|current | 当前步骤/进度 | Number | `0` | 支持小数 |
|direction | 展示方向 | String | `horizontal` | `horizontal/vertical` |
|transition | 进度变化动效 | Boolean | `false` |-|
