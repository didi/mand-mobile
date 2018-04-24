---
title: Stepper 步进器
preview: https://didi.github.io/mand-mobile/examples/#/stepper
---

增加，减少或修改当前数值

### 引入

```javascript
import { Stepper } from 'mand-mobile'

Vue.component(Stepper.name, Stepper)
```

### 代码演示
<!-- DEMO -->

### API

#### Stepper Props
属性    | 说明 | 类型 | 默认值
---------|------|--------|----
default-value |默认值| Number|-
step|每次改变步数，可以为小数|Number|`1`
min|最小值|Number|`-Infinity`
max|最大值|Number|`Infinity`
disabled|禁用| Boolean|`false`
read-only|只读| Boolean|`false`

#### Stepper Events

##### @change(currentValue)
值发生变化事件
