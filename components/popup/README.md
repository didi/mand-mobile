---
title: Popup 弹出层
preview: https://didi.github.io/mand-mobile/examples/#/popup
---

由其他控件触发，屏幕滑出或弹出一块自定义内容区域

### 引入

```javascript
import { Popup, PopupTitleBar } from 'mand-mobile'

Vue.component(Popup.name, Popup)
Vue.component(PopupTitleBar.name, PopupTitleBar)
```

### 代码演示
<!-- DEMO -->

### API

#### Popup Props
|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|v-model|弹出层是否可见|Boolean|`false`|-|
|has-mask|是否有蒙层|Boolean|`true`|-|
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|
|position|弹出层位置|String|`center`|`center`, `top`, `bottom`, `left`, `right`|
|transition|弹出层过度动画|String|-|`fade`, `fade-bounce`, `fade-slide`, `fade-zoom`<br> `slide-up`, `slide-down`, `slide-left`, `slide-right`|

#### PopupTitleBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|title|标题|String|-|-|
|describe|描述|String|-|-|
|ok-text|确认按钮文案|String|-|为空则没有确认按钮|
|cancel-text|取消按钮文案|String|-|为空则没有取消按钮|
|large-radius <sup class="version-after">2.4.0+</sup>|大圆角模式|Boolean|`false`|-|
|only-close <sup class="version-after">2.4.0+</sup>|只有右侧关闭按钮|Boolean|`false`|-|
|title-align <sup class="version-after">2.4.0+</sup>|标题和描述位置|String|`center`|注意`left`和`right`时会分别隐藏左右两侧按钮|

#### Popup Events

#### @beforeShow()
弹出层即将展示事件

#### @show()
弹出层展示事件

#### @beforeHide()
弹出层即将隐藏事件

#### @hide()
弹出层隐藏事件

#### PopupTitleBar Events

##### @confirm()
确认选择事件

##### @cancel()
取消选择事件
