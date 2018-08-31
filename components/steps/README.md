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

#### Tabs Props
属性 | 说明 | 类型 | 默认值 | 备注
----|-----|------|------|------
steps | 步骤信息数组 | Array | - | 数组中每个元素须包含`name`属性，会作为步骤名称显示，元素的`description`只在***direction***为`''vertical''`时展示|
current | 当前步骤 | Number | `0` | 可通过修改该值动态改变当前所在步骤|
direction | 展示方向 | String | `'horizontal'` | 可选`'horizontal'`横向展示，`'vertical'`纵向展示|
