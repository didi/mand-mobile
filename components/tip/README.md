---
title: Tip 气泡提示
preview: https://mand-mobile.github.io/2x-doc/examples/#/tip
---

### 引入

```javascript
import { Tip } from 'mand-mobile'

Vue.component(Tip.name, Tip)
```

### 代码演示
<!-- DEMO -->

### API

#### Tip Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|name|提示名称|String/Number|-|一般用于特殊类名|
|content|提示文本内容|String/Number|-|-|
|placement|位置|String|`top`|`top`, `left`, `bottom`, `right`|
|icon|图标|String|-|可选值请参考组件`Icon`|
|icon-svg|使用svg图标|Boolean|`false`|-|
|fill|充满子元素|Boolean|`false`|如按钮提示，与按钮等宽(top/bottom)或等高(left/right)|
|offset|偏移量|Object:{left, top}|-|-|

#### Tip Events

##### @show()
提示框显示后触发的事件

##### @hide()
提示框隐藏后触发的事件
