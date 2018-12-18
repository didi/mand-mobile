---
title: NoticeBar
preview: https://mand-mobile.github.io/2x-doc/examples/#/notice-bar
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
|mode|notice bar mode|String|-|`closable`, `link`|
|type|theme|String|`default`|`default`, `activity`, `warning`|
|time|display time|Number|`0`|unit is `ms`, which does not disappear automatically and can be set to `0`|
|round|fillet radius|Boolean|`false`|-|
|multi-rows|content exceeds line break display|Boolean|`false`|Priority is heigher than scrollable|
|scrollable|show scrolling animation when content is exceeded|Boolean|`false``|Priority is less than multiRows|
|icon|notice bar icon|String|-|-|
|icon-svg|use svg icon|Boolean|`false`|-|

#### NoticeBar Slots

#### default
Default slot of content

#### left
Left slot, generally is used to place icons, etc

#### right
Right slot, generally is used to place icons, etc

#### NoticeBar Events

##### @close()
Notice bar close event (set `mode` to 'closable' or `closable` to true)
