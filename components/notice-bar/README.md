---
title: Notice 通告栏
preview: https://didi.github.io/mand-mobile/examples/#/notice-bar
---

通常用于系统提醒、活动提醒等通知

### 引入

```javascript
import { NoticeBar } from 'mand-mobile'

Vue.component(NoticeBar.name, NoticeBar)
```


### 代码演示
<!-- DEMO -->

### API

#### NoticeBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|mode|右边提示类型，可选`closable`,`link`|`''`|优先级小于slot|
|time|显示时长|Number|`0`|单位为`ms`，不需要自动消失可将其置为`0`|
|isCircle|是否椭圆形展示|Boolean|`false`|-|
|multiRows|内容超出是否多行展示|Boolean|`false`|优先级高于scrollable|
|scrollable|内容超出是否滚动展示|Boolean|`false`|优先级小于multiRows|
|icon|在开始位置的图标样式|String|`''`|***推荐使用slot***,仅为兼容1.x版本|
|closable|是否可关闭|Boolean|`false`|***推荐使用mode或slot***,仅为兼容1.x版本|

#### InputItem Slots

#### left
左侧插槽，一般用于放置图标等

#### right
右侧插槽，一般用于放置图标等

#### NoticeBar Events

##### @click()
点击通告栏右侧Icon后触发的事件，设置`mode`为'closable'或`closable`为true会同时触发关闭通告栏

