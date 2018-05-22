---
title: NoticeBar
preview: https://didi.github.io/mand-mobile/examples/#/notice-bar
---

Usually used for system alerts, event reminders, etc

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
|closable|notice bar is closable|Boolean|`true`|-|
|time|notice bar retention time|Number|`0`|unit is `ms`, which does not disappear automatically and can be set to `0`|
|icon|notice bar icon|String|`circle-alert`|-|

