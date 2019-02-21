---
title: Transition 动画
preview: https://didi.github.io/mand-mobile/examples/#/transition
---

复用动画切换组件

### 引入

```javascript
import { Transition } from 'mand-mobile'

Vue.component(Transition.name, Transition)
```

### 代码演示
<!-- DEMO -->

### API
`md-transition`组件为Vue内置`transtion`的一层封装，支持所有Transition的属性参数。

其中内置动画`name`参数如下：

- `md-fade`
- `md-fade-up`
- `md-fade-down`
- `md-fade-left`
- `md-fade-right`
- `md-slide-up`
- `md-slide-down`
- `md-slide-left`
- `md-slide-right`
- `md-bounce`
- `md-punch`
- `md-zoom`

