---
title: Ruler 刻度尺
preview: https://didi.github.io/mand-mobile/examples/#/ruler
---

滑动选择

### 引入

```javascript
import { Ruler } from 'mand-mobile'

Vue.component(Ruler.name, Ruler)
```

### 代码演示
<!-- DEMO -->

### API

#### [Ruler] Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|双向绑定的值|Number|0|-|
|scope|刻度尺范围|Number[]|[0, 100]|-|
|step|刻度尺每一大格步数|Number|10|-|
|unit|刻度尺每一小格步数|Number|1|-|
|min|最小可滑动位置|Number|0|-|
|max|最大可滑动位置|Number|100|-|

#### [Ruler] Events

##### @change(currentValue)
值发生变化事件
