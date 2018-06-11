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
|closable|whether the notice bar is closable or not|Boolean|`true`|-|
|time|display time|Number|`0`|unit is `ms`, which does not disappear automatically and can be set to `0`|
|icon|notice bar icon|String|`circle-alert`|-|

