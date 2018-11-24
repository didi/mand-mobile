---
title: Tag 标签
preview: https://didi.github.io/mand-mobile/examples/#/tag
---

用于表示区域的状态的标签

### 引入

```javascript
import { Tag } from 'mand-mobile'

Vue.component(Tag.name, Tag)
```

### 代码演示
<!-- DEMO -->

### API

#### Tag Props
|属性 | 说明 | 类型 | 默认值 |可选值|
|----|-----|------|------|------|
|size|标签大小|String|`large`|`tiny`, `small`, `large`|
|shape|标签形状|String|`square`|`square`, `circle`, `fillet`, `quarter`, `coupon`|
|type|标签样式|String|`ghost`|`fill`(填充), `ghost`(线框)|
|fill-color|标签颜色`rgba` or `hex number`|String|`rgba(0,0,0,0)`|-|
|font-weight|字体粗细|String|`normal`|`normal`, `bold`, `bolder`|
|font-color|字体颜色`rgba` or `hex number`|String|`#fc9153`|-|
