---
title: Skeleton
preview: https://didi.github.io/mand-mobile/examples/#/Skeleton
---

### Import

```javascript
import { Skeleton } from 'mand-mobile'

Vue.component(Skeleton.name, Skeleton)
```

### Code Examples
<!-- DEMO -->

### API

#### Skeleton Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|loading|display the skeleton loading |Boolean|true|-|
|avatar|display avatar placeholders|Boolean|false|-|
|avatar-size|avatar placeholders' size|String|md| sm, md, lg |
|title|display the title placeholders|Boolean|false|-|
|title-width|title placeholders width|Number,String| 40%|-|
|row|number of rows|Number|3|-|
|row-width|rows' width|String,Number,Array<String\|Number>|100%|-|
