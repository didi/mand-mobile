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
|closable|是否可关闭|Boolean|`true`|-|
|time|显示时长|Number|`0`|单位为`ms`，不需要自动消失可将其置为`0`|
|icon|在开始位置的图标样式|String|`circle-alert`|-|

