---
title: WaterMark
preview: https://mand-mobile.github.io/2x-doc/examples/#/water-mark
---

Container with watermark background

### 引入

```javascript
import { WaterMark } from 'mand-mobile'

Vue.component(WaterMark.name, WaterMark)
```

### 代码演示
<!-- DEMO -->

### API

#### WaterMark Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|content|-|String|-|complex content using `scoped slot`|
|spacing|-|String|`20vw`|-|
|repeat-x|-|Boolean|`true`|-|
|repeat-y|-|Boolean|`true`|-|
|rotate|-|String|`-30`|-|
|opacity|-|String|`0.1`|-|

#### WaterMark Slots

##### default
Default slot of content

##### watermark
scoped slot of watermark content

```html
<div slot="watermark" slot-scope="{ coord }">
  <!-- coord.row row index -->
  <!-- coord.col column index -->
</div>
```
