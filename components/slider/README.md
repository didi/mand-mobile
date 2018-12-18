---
title: Slider 滑块
preview: https://mand-mobile.github.io/2x-doc/examples/#/slider
---

### 引入

```javascript
import { Slider } from '@didi/mand-mobile'

Vue.component(Slider.name, Slider)
```

### 代码演示
<!-- DEMO -->

### API

#### Slider Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|双向绑定的值, 当开启<code>range</code>时, 其值为数组形式</code>|number, number[]|`0`|-|
|disabled|是否禁用滑块|Boolean|`false`|-|
|min|可拖动的最小值|number|`0`|-|
|max|可拖动的最大值|number|`100`|-|
|step|步长|number|`1`|-|
|range|是否启动双向拖动|Boolean|`false`|-|
|format|显示文本的格式化函数|Function|`(val) => {return val}`|-|
