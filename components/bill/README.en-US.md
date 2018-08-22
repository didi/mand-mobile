---
title: Bill
preview: https://didi.github.io/mand-mobile/examples/#/water-mask
---

Container with watermark background

### 引入

```javascript
import { Bill } from 'mand-mobile'

Vue.component(Bill.name, Bill)
```

### 代码演示
<!-- DEMO -->

### API

#### Bill Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|name|-|String|-|-|
|no|-|String|-|-|
|waterMark|-|String|-|complex content using `scoped slot`|

#### Bill Slots

##### default
Default slot of content

##### watermask
scoped slot of watermask content

```html
<div slot="watermark" slot-scope="props">
  <!-- content -->
</div>
```
