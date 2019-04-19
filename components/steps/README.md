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
|steps|步骤信息数组|Array<{name, text}>|-|-|
|current|当前步骤/进度|Number|`0`| 支持小数 |
|direction|展示方向|String|`horizontal`|`horizontal`, `vertical`|
|transition|进度变化动效|Boolean|`false`|-|
|vertical-adaptive|步骤高度自适应|Boolean|`false`|仅用于`vertical`, **如果设置为`true`则根据容器高度自适应，需设置`.mfe-steps`高度**|


#### Steps Slots

#### icon

统一自定义所有步骤图标，支持`scoped slot`如下所示：<sup class="version-after">2.2.1+</sup>

```html
<template slot="reached" slot-scope="{ index, currentIndex }">
  <b v-if="props.index === props.currentIndex">{{ props.index }}</b>
  <span v-else>{{ props.index }}</span>
</template>
```

#### reached

已完成步骤图标插槽，用于自定义已完成步骤图标，支持`scoped slot`如下所示：

```html
<template slot="reached" slot-scope="{ index }">
  <!-- 如果索引值为1，则自定义 -->
  <md-icon name="checked" v-if="index === 1"></md-icon>
  <!-- 默认步骤图标 -->
  <div class="step-node-default" v-else></div>
</template>
```

#### current

当前步骤图标插槽，用于自定义当前步骤图标，支持`scoped slot`用法同`reached`

#### unreached

未完成步骤图标插槽，用于自定义未完成步骤图标，支持`scoped slot`用法同`reached` <sup class="version-after">2.2.1+</sup>

#### content

步骤内容插槽

```html
<template
  slot="content"
  slot-scope="{ index, step }"
>
  <!-- index 步骤索引 -->
  <!-- step 步骤信息 -->
</template>
```