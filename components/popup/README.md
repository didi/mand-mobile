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
|transition|弹出层过度动画|String|`fade/fade-bounce/fade-slide, slide-up/slide-down/slide-left/slide-right`|-|
|prevent-scroll|是否禁止滚动穿透|Boolean|`false`|此方案在内容顶部和底部仍有滚动穿透的问题，推荐使用`ScrollView`作为滚动区域|
|prevent-scroll-exclude|禁止滚动的排除元素|String/HTMLElement|-|-|

#### PopupTitleBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|title|标题|String|-|-|
|ok-text|确认按钮文案|String|-|为空则没有确认按钮|
|cancel-text|取消按钮文案|String|-|为空则没有取消按钮|

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
