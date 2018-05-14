---
title: Tag
preview: https://didi.github.io/mand-mobile/examples/#/tag
---

Use it as label

### How to Use

```javascript
import { Tag } from 'mand-mobile'

Vue.component(Tag.name, Tag)
```

### Code Example
<!-- DEMO -->

### API

#### Tag Props
| Props | Description | Type | Default | Options |
|----|-----|------|------|------|
|size| The size of tag  |String|`large`|`tiny`, `small`, `large`|
|shape| The shape of tag |String|`square`|`square`, `circle`, `fillet`|
|type| The type of tag |String|`ghost`|`fill`, `ghost`|
|fill-color| Background color, `rgba` or `hex number`|String|`rgba(0,0,0,0)`|-|
|font-weight| Font weight |String|`normal`|`normal`, `bold`, `bolder`|
|font-color| Font color, `rgba` or `hex number`|String|`#fc9153`|-|
