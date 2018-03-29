---
title: Tip 气泡提示
preview: https://didi.github.io/mand-mobile/examples/#/tip
---

### 引入

```javascript
import { Tip } from 'mand-mobile'

Vue.component(Tip.name, Tip)
```

### 代码演示
<!-- DEMO -->

### API

#### Tips Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|content|提示文本内容|String|-|-|
|placement|位置|String|`top`|`top`, `left`, `bottom`, `right`|

#### Tip@show()
提示框显示后触发的事件

#### Tip@hide()
提示框隐藏后触发的事件
