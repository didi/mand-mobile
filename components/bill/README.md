---
title: Bill 票据
preview: https://didi.github.io/mand-mobile/examples/#/bill
---

Electronic bill

### 引入

```javascript
import { Bill } from 'mand-mobile'

Vue.component(Bill.name, Bill)
```

### 代码演示
<!-- DEMO -->

### API

#### Bill Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|name|票据抬头|String|-|-|
|no|票据编号|String|-|-|
|waterMark|水印内容|String|-|复杂内容使用`scoped slot`|

#### Bill Slots

##### default
默认内容插错

##### watermask
水印内容scoped插槽

```html
<div slot="watermark" slot-scope="props">
  <!-- 水印内容 -->
</div>
```