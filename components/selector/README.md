---
title: Selector 列表选择器
preview: https://didi.github.io/mand-mobile/examples/#/selector
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
|data|数据源|Array<{value,text,disabled,...}>|`[]`|`text`可为`html`片段|
|default-value <sup class="version-after">2.3.0+</sup>|选择器初始选中项的值|any|-|`multi`为`true`时，`default-value`应该传数组|
|title|选择器标题|String|-|-|
|describe|选择器描述|String|-|-|
|ok-text|选择器确认文案|String|-|若为空则为`确认模式`，即点击选项直接选择|
|cancel-text|选择器取消文案|String|`取消`|-|
|large-radius <sup class="version-after">2.4.0+</sup>|选择器标题栏大圆角模式|Boolean|`false`|-|
|hide-title-bar <sup class="version-after">2.4.0+</sup>|隐藏选择器标题栏|Boolean|`false`|-|
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|
|is-check|是否有`check`图标|Boolean|`false`|仅`确认模式`|
|max-height|选择器内容区域最高高度, 超出后可滚动|Number/String|`auto`|-|
|min-height|选择器内容区域最小高度, 超出后可滚动|Number/String|`auto`|-|
|icon|选中项的图标|String|`checked`|-|
|icon-inverse|非选中项的图标|String|`check`|-|
|icon-disabled|禁用项的图标|String|`check-disabled`|-|
|icon-size|图标大小|String|`lg`|-|
|icon-svg|使用svg图标|Boolean|`false`|-|
|icon-position|图标位置|String|`right`|`left`, `right`|
|multi<sup class="version-after">2.3.0+</sup>|支持多选|Boolean|`false`|`multi`为`true`时，`ok-text`不能为空|

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

#### Selector Slots

##### default

```html
<md-selector>
  <template slot-scope="{ option, index, selected }">
    <div class="md-selector-custom-title">Hello, {{ option.text }}</div>
  </template>
</md-selector>
```

##### header

顶部插槽        

##### footer

底部插槽      