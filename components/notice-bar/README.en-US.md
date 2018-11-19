---
title: NoticeBar
preview: https://didi.github.io/mand-mobile/examples/#/notice-bar
---

Mostly for system alerts, event reminders, etc

### Import

```javascript
import { NoticeBar } from 'mand-mobile'

Vue.component(NoticeBar.name, NoticeBar)
```


### Code Examples
<!-- DEMO -->

### API

#### NoticeBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|mode|notice bar mode|String|-|`closable`/link, priority is less than slot|
|type|theme|-|`default`/`default/warning`|
|time|display time|Number|`0`|unit is `ms`, which does not disappear automatically and can be set to `0`|
|isCircle|notice bar is oval display or not|Boolean|`false`|-|
|multiRows|Content exceeds line break display|Boolean|`false`|Priority is heigher than scrollable|
|scrollable|Show scrolling animation when content is exceeded|Boolean|`false``|Priority is less than multiRows|
|icon|notice bar icon|String|`circle-alert`|**recommended use slot**,will be deleted in the future|
|icon-svg|use svg icon|Boolean|`false`|-|
|closable|whether the notice bar is closable or not|Boolean|`false`|**recommended use mode or slot**,will be deleted in the future|

#### InputItem Slots

#### left
Left slot, generally is used to place icons, etc.

#### right
Right slot, generally is used to place icons, etc.

#### NoticeBar Events

##### @click()
When you click the icon on the right will trigger event.
When the `mode` is `closable` or the `closable` is true, the event will be close at the same time
