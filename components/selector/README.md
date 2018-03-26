---
title: Selector 列表选择器
preview: https://didi.github.io/mand-mobile/examples/selector
---

用于弹出列表中选择一项

### 引入

```javascript
import { Selector } from 'mand-mobile'

Vue.component(Selector.name, Selector)
```

### 代码演示

<!-- DEMO -->

### API

#### Selector Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|选择器是否可见|Boolean|false|-|
|data|数据源|Array<{value,text,...}>|`[]`|`label`可为`html`片段|
|default-index|选择器初始选中项索引|Number|-|-|
|invalid-index|选择器不可用选项索引|Number|-|-|
|title|选择器标题|String|-|-|
|ok-text|选择器确认文案|String|-|若为空则为`确认模式`，即点击选项直接选择|
|cancel-text|选择器取消文案|String|`取消`|-|
|is-check|是否有`check`图标|Boolean|`false`|仅`确认模式`|
|option-render|返回各选项渲染内容|Function({value, text ,...}):String|-|`vue 2.1.0+`可使用`slot-scope`，参考`Radio`|


#### Selector Events

#### @choose({value, text, ...})
选择器选中某选项事件

#### @confirm({value, text, ...})
选择器确认选中事件

#### @cancel()
选择器取消选中事件

#### @show()
选择器展示事件

#### @hide()
选择器隐藏事件
