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
v-model<sup class="version-after">1.5.3+</sup> | 当前值 | Number/String |-
default-value |默认值| Number/String|-
step|每次改变步数，可以为小数|Number/String|`1`
min|最小值|Number/String|`-Infinity`
max|最大值|Number/String|`Infinity`
disabled|禁用| Boolean|`false`
read-only|只读| Boolean|`false`
is-integer<sup class="version-after">1.5.3+</sup>|只能输入整数| Boolean|`false`

#### Stepper Events

##### @change(currentValue)
值发生变化事件
