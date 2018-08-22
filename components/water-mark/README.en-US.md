---
title: WaterMask
preview: https://didi.github.io/mand-mobile/examples/#/water-mask
---

Container with watermark background

### 引入

```javascript
import { WaterMask } from 'mand-mobile'

Vue.component(WaterMask.name, WaterMask)
```

### 代码演示
<!-- DEMO -->

### API

#### WaterMask Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|content|-|String|-|complex content using `scoped slot`|
|spacing|-|String|`20vw`|-|
|repeatX|-|Boolean|`true`|-|
|repeatY|-|Boolean|`true`|-|
|rotate|-|String|`-30`|-|
|opacity|-|String|`0.1`|-|

#### WaterMask Slots

##### default
Default slot of content

##### watermask
scoped slot of watermask content

```html
<div slot="watermark" slot-scope="props">
  <!-- content -->
</div>
```
